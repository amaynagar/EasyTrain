import {useState} from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
 
import "./model_select.css";



function ModelSelect() {
    const navigate=useNavigate();

const [file,setFile]=useState(null);
const [target,setTarget]=useState("");

const handlefile=async ()=>{
    if(!file){
        alert("Please select a file");
        return;
    }


try {
    const formData=new FormData();
formData.append("file",file);
formData.append("target",target);
const res=await axios.post("https://laughing-space-garbanzo-7v9wv67j9xr4hrgj7-8000.app.github.dev/upload",formData,
     
)

// console.log(res.data["models"]["LinearRegression"]);
// console.log(res.data["type"]);

navigate("/train",{state:{data:res.data["models"],
    target:target,
    file:file
}});
// navigate("/train",{state:{data:}});

}
catch(err){
    console.log(err);
}




}

    return (
        <div className="model-select">
           <div className="file-upload">
             <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />

             <input type="text" placeholder="Enter target column" value={target} onChange={(e) => setTarget(e.target.value)} className="target_val" />
            

<button onClick={handlefile}>Upload File</button>
           </div>
            
        </div>
    )
}
export default ModelSelect;