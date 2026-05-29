import React,{useState,useRef,useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";



function TrainModel() {
const location=useLocation();
const data=location.state?.data||{};
const target=location.state?.target||"";
const file=location.state?.file||null;
const [models,setModels]=useState(data["models"] || {});
const [modelType,setModelType]=useState(Object.keys(models)[0] || "");
const [result,setResult]=useState("");
const type=useRef( data["type"]||"");

const [parameters,setParameters]=useState({});

const [selectedParams,SetSelectedParams]=useState({});

const onsubmit=async()=>{
const formData=new FormData();
formData.append("model_name", modelType);
formData.append("model_type", type.current);
formData.append("file", file);
formData.append("target", target);
formData.append("parameters", JSON.stringify(selectedParams));
try{
    const res=await axios.post("https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev/model",formData)
    setResult(res.data);
     
     
    window.open(`https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${res.data["report_url"]}`, "_blank");
    

}catch(err){
    console.error(err);}

}


useEffect(()=>{
  const fetchParameters = async () => {

        try {

            const param = await axios.get(
                `https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev/model/parameters/${modelType}/${type.current}`
            );

            setParameters(param.data.parameters);
            SetSelectedParams(param.data.parameters);
            console.log(param.data.parameters);

        } catch (err) {

            console.error(err);

        }

    };

    fetchParameters();



},[modelType])


return (
    <div>
        <h2>hello</h2>
       <div> 
        <p>Select the {type.current} model </p>
         <p>{modelType}</p>
         
        <select name="Select model"  id="" onChange={(e)=>setModelType(e.target.value)}>
        
            { Object.keys(models).map((modelName,index) => (
                <option key={index} value={modelName} i>
                    {modelName}
                </option>
            ))}
        </select>

        
        </div>

    <div>


<div>

{
parameters && Object.keys(parameters).length > 0 && (

    Object.keys(parameters).map((param, index) => (

        <div
            key={index}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
            }}
        >

            <label style={{ minWidth: "150px" }}>
                {param}
            </label>

            <select name={param} defaultValue="" onChange={
                (e)=>(SetSelectedParams(prev=>({...prev,[param]:e.target.value})))
            }> 
{/* 
                <option value="" disabled>
                    Select {param}
                </option> */}

                {parameters[param].map((value, inw) => (

                    <option key={inw} value={value}>
                        {String(value)}
                    </option>

                ))}

            </select>

        </div>

    ))

)
}

</div>
<button onClick={onsubmit}>Train Model</button>
<br></br>


result:
{result && 
(
    <div>
    <p>Model trained successfully!</p>
     <ul>

         {Object.keys(result["other_info"]).map((key,index)=>(
<li key={index}>
{key}: {result["other_info"][key]}
</li>
         )
)}
     </ul>

        <a href={`https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${result["model_key"]}`} download>
            Download Trained Model
        </a>

        <br></br>
        <iframe
          src={`https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev${result["report_url"]}`}
          width="100%"
          height="900px"
          title="Profiling Report"
        />

        
    </div>
)
}


    </div>




    </div>

    
)


}

export default TrainModel;