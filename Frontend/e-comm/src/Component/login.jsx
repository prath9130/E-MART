import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const Login=()=>{
    const [uemail,setUemail]=useState('');
    const [upass,setUpass]=useState('');
    const navigate=useNavigate();

//  ---------------------------------------------------------------------------------------------------
//     login function to login to the mart as customer 
//     axios.post method used to compare users data with database using login api'
//  ---------------------------------------------------------------------------------------------------


    const login=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:1000/login",{
            u_email: uemail,
            u_pass: upass,
            u_role:"customer"
        })
        .then((response)=>{
            if(response.data.auth){
                let result=JSON.stringify(response.data.data);
                let auth=JSON.stringify(response.data.auth);    
                
                localStorage.setItem('user',result);
                localStorage.setItem('token',auth);
                navigate('/profile'); 
            }
            else{
                alert('Invalid email or password..!');               
            }
        })
    }

    return(
        <>
            <div className="border border-success text-center mx-auto w-50 rounded my-5">
                <div className="py-2 text-uppercase bg-success text-light">
                    <div className="h3">login</div>
                    <div className="h6">customer</div>
                </div>
                
                <div className="my-4">
                    <input type="email" name="uemail" placeholder="Email" 
                    className="text-center rounded border border-success w-50 py-1"
                    onChange={(e)=>setUemail(e.target.value)} />
                </div>
                <div>
                    <input type="password" name="upass" placeholder="Password" 
                    className="text-center rounded border border-success outline-none w-50 py-1"
                    onChange={(e)=>setUpass(e.target.value)}/>
                </div>
                <button className="btn btn-success my-3" onClick={login}>Login</button>
                <div className="mb-3"><Link to={'/owner_login'}><a className="text-success">for owners login</a></Link></div>
            </div>
        </>
    )
}