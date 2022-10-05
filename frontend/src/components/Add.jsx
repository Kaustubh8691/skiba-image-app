import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Add = () => {
  const [name,setName]=useState()
  const navigate=useNavigate();
  const id=sessionStorage.getItem("id")
  if(id==null){
    navigate("/")
  }
  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });

  }

  const [isSucces, setSuccess] = useState(null);
  const submit = async () =>{
    if(name==="" || userInfo.filepreview===null){
      alert("fill the input data")
    }
    else{
      const formdata = new FormData(); 
    formdata.append('name',name )
    const id=sessionStorage.getItem("id");
    formdata.append("userID",id)
    formdata.append('testImage', userInfo.file);

    axios.post("http://localhost:5000", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { 
      // console.log(res,"response");
      if(res.status === 200){
        setSuccess("Image upload successfully");
        navigate("/posts")
      }

    })

    }
    
  }
  const back=()=>{
    navigate("/posts")
  }
    
  return (
    <div className="container2 mr-60">
    <div className='sun-container'>
    <h3 className="text">Add Image</h3>


<div className="formdesign">
{isSucces !== null ? <h4> {isSucces} </h4> :null }
  <div className="form-row">
    <label className="text-white">Select Image :</label>
    <input type="text" className="form-control" value={name} placeholder='Name' required onChange={(e)=>setName(e.target.value)} />

    <input type="file" className="form-control" required name="upload_file"  onChange={handleInputChange} />
  </div>

  <div className="form-row">
    <button type="submit" className="btns" onClick={()=>submit()} > Save </button>
    <button  className="btnss" onClick={()=>back()} > Back </button>
  </div>
</div>
    </div>
    </div>
  )
}

export default Add