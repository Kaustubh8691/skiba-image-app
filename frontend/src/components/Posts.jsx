import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from 'react-router-dom';
import "./post.css"
const  Posts=()=> {
  const navigate=useNavigate();
  const id=sessionStorage.getItem("id")
  if(id==null){
    navigate("/")
  }
  const [data, setData] = useState([]);
  const getdata=async()=>{
    let datas=await  axios
    .get("http://localhost:5000/"+id)
    .then((res) => setData(res.data.reverse()))
    .catch((err) => console.log(err, "it has an error"));
      console.log(data.reverse())
  }
  const handlelogout=()=>{
    sessionStorage.clear();
    console.log("logout");
    navigate("/");
  }
  const handleAdd=()=>{
    navigate("/addImage")
  }
  
  useEffect(() => {
   getdata()
  },[]);
  
  
  return (
    <div className="container">
    <div className="header">
    <button className="btns new" onClick={()=>handleAdd()}>New Image</button>

      <button className="btns logout" onClick={()=>handlelogout()}>logout</button>

    </div>
    <h3>Images store like google drive</h3>
    <div className="posts">

      {data.length>0?data.map((singleData,idx) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return <Post key={idx} base64String={base64String} name={singleData.name}/>
      }): <div>No images present</div>}
      </div>
    </div>
  );
}

export default Posts;