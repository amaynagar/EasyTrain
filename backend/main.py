from fastapi import FastAPI,UploadFile,File,Form
from fastapi.responses import JSONResponse,FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from Select_model.select_model import models ,param_grids
from model.model_select import select_model
from model.preprocessing import model_train

from ydata_profiling import ProfileReport


import pandas as pd
import uuid
import joblib
import os
import json

app=FastAPI()
os.makedirs("trained_models", exist_ok=True)
os.makedirs("reports",exist_ok=True)

app.mount("/reports",StaticFiles(directory="reports"), name="reports")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload(target: str=Form(...), file: UploadFile = File(...)):
    df=pd.read_csv(file.file)
    models=select_model(df,target)

    # return JSONResponse(status_code=200, content={"models": [models["type"]]+list(models["models"].keys())})
    
    return JSONResponse(status_code=200, content={"models": models})


@app.post("/model")
async def get_model(model_name:str=Form(...),model_type:str=Form(...),file: UploadFile = File(...),target:str=Form(...),parameters:str=Form(...)):
    parameters=json.loads(parameters)
    model_type=model_type.strip().lower()
    model_name=model_name.strip().lower()
    print(model_type,model_name)
    model=models[model_type][model_name]
    model=model()
    df=pd.read_csv(file.file)
    
    response=model_train(df,target,model,model_type)
     
    trained_model=response["model"]
    other_info= dict(list(response.items())[1:])
    key=str(uuid.uuid4())
    # Store the trained model in a dictionary with the unique key
    model_path=f"trained_models/{key}.pkl"
    joblib.dump(trained_model, model_path)

    # Generate a profiling report
    profile_path=f"reports/{key}.html"
    profile=ProfileReport(df, title="Data Profiling Report", explorative=True)
    profile.to_file(profile_path)




    return JSONResponse(status_code=200, content={"model_key": f"/download/{key}", "other_info": other_info,"report_url":f"/reports/{key}.html"})

@app.get("/download/{key}")
async def download_model(key:str):
    model_path=f"trained_models/{key}.pkl"
    if os.path.exists(model_path):
        return FileResponse(path=model_path,filename=f"{key}.pkl",media_type="application/octet-stream")
    else:
        return JSONResponse(status_code=404, content={"message": "Model not found."})
    



@app.get("/model/parameters/{model_name}/{model_type}")
async def get_model_parameters(model_name:str,model_type:str):
    model_name=model_name.strip().lower()
    model_type=model_type.strip().lower()

    if model_type in param_grids and model_name in param_grids[model_type]:
        return JSONResponse(status_code=200, content={"parameters": param_grids[model_type][model_name]})
    else:
        return JSONResponse(status_code=404, content={"message": "Model parameters not found."})




