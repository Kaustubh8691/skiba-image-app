import React, {useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import {gapi} from "gapi-script"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const navigate=useNavigate();
    const clientId="884472437498-dprsrbrjj8h45gvi85gkasm24tp7oku5.apps.googleusercontent.com";
    useEffect(() => {
      gapi.load("client:auth2",()=>{
        gapi.auth2.init({clientId:clientId})
      })
    }, [])
    
    const responseSuccessGoogle = (response) => {
        console.log(response);
        axios({
            method:"POST",
            url:"http://localhost:5000/login",
            data:{tokenId:response.tokenId},
            }).then(response=>{
                // console.log(response);
                if(response.status==200){
                    // console.log(response.data.user._id)
                    sessionStorage.setItem("id",response.data.user._id)
                    navigate("/posts")
                }else{
                    alert("check your password and email")
                }
            })
      }
    const responseErrorGoogle = (response) => {
        console.log(response);
      }
  return (
    <div className='App'>
        <div className="col-md-6 offset-md-3 text-center">
        <h1>Welcome to Image app</h1>
            <h3>Login with Google</h3>
            <GoogleLogin id="login-btn"
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                 />
            </div>
            

    </div>
  )
}

export default Login