import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Register = () => {
    
    const [uname,setUname]=useState('');
    const [uemail,setUemail]=useState('');
    const [upass,setUpass]=useState('');
    const [urole,setUrole]=useState("customer");
    const navigate=useNavigate();


//  ---------------------------------------------------------------------------------------------------
//     register function to register new customer 
//     axios.post method used to store new customer in database using api's
//  ---------------------------------------------------------------------------------------------------

    
    const register=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:1000/register",{
            u_name: uname,
            u_email: uemail,
            u_pass: upass,
            u_role: urole
        })
        .then((response)=>{
            let data=JSON.stringify(response.data);
            if(data){
                alert("User registered successfully..!!");
                navigate('/login');
            }
            else{
                alert('Invalid email or password');
            }
        })
    }

    return (
        <>
            <div className="border border-success text-center mx-auto w-50 rounded my-5">
                <div className="h3 py-3 text-uppercase bg-success text-light">Register</div>
                <div>
                    <input type="text" name="uname" placeholder="Username" 
                    className="text-center my-4 rounded border border-dark w-50 py-1"
                    onChange={(e)=>setUname(e.target.value)}/>
                </div>
                <div className="">
                    <input type="email" name="uemail" placeholder="Email" 
                    className="text-center rounded border border-success w-50 py-1"
                    onChange={(e)=>setUemail(e.target.value)} />
                </div>
                <div className="my-4">
                    <input type="password" name="upass" placeholder="Password" 
                    className="text-center rounded border border-success w-50 py-1 "
                    onChange={(e)=>setUpass(e.target.value)}/>
                </div>
                <button className="btn btn-success mb-4" onClick={register}>Register</button>
            </div>
        </>
    )
}