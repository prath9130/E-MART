import React from "react";

export const Profile=()=>{

//  ---------------------------------------------------------------------------------------------------
//     get data of user from localstorage to show users detail
//  ---------------------------------------------------------------------------------------------------


    let data=localStorage.getItem('user');
    data=JSON.parse(data);


    return(
        <>
            <div className="border border-primary w-50 mx-auto my-5 text-center rounded">
                <div className="bg-primary text-light p-3 h3">PROFILE</div>
                <div className="my-3">
                    <div className="h6">Name</div>
                    <input type="text" name="name" value={data.u_name} className="p-1 border border-primary bg-info text-center w-50"/>
                </div>
                <div className="my-3">
                    <div className="h6">Email</div>
                    <input type="text" name="name" value={data.u_email} className="p-1 border border-primary bg-info text-center w-50"/>
                </div>
                <div className="mt-3 mb-4">
                    <div className="h6">Role </div>
                    <input type="text" name="name" value={data.u_role} className="p-1 border border-primary bg-info text-center w-50"/>
                </div>
            </div>
        </>
    )
}