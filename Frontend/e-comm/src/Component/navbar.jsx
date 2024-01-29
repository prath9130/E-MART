import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

//  ---------------------------------------------------------------------------------------------------
//     user data get from local storage to show options as per the role 
//  -------------------------------------------------------------------------------------------------


    let data = localStorage.getItem("user");
    const navigate = useNavigate();
    data = JSON.parse(data);
    
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <nav className="d-flex container-fluid  justify-content-between px-5 py-3 border border-dark fluid">
                <div className="fs-4">E-MART</div>

                {
                    data && data.u_role == "customer"
                        ?
                        (
                            <div className="d-flex align-items-center">
                                <Link to={'/profile'} className="h5 text-decoration-none text-dark px-2 mx-2">Profile</Link>
                                <Link to={'/view_products'} className="h5 text-decoration-none text-dark px-2 mx-2" >Products</Link>
                                <Link to={'/orders'} className="h5 text-decoration-none text-dark px-2 mx-2">Orders</Link>
                            </div>
                        )
                        :
                        (
                            <div>
                                {
                                    data && data.u_role == "owner"
                                        ?
                                        (
                                            <div className="d-flex align-items-center">
                                                <Link to={'/profile'} className="h5 text-decoration-none text-dark px-2 mx-2">Profile</Link>
                                                <Link to={'/products'} className="h5 text-decoration-none text-dark px-2 mx-2" >Products</Link>
                                                <Link to={'/addproduct'} className="h5 text-decoration-none text-dark px-2 mx-2">Add Product</Link>
                                                <Link to={'/all_orders'} className="h5 text-decoration-none text-dark px-2 mx-2">All Orders</Link>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>

                                            </div>
                                        )
                                }
                            </div>
                        )
                }


                {!data ? (
                    <div className="d-flex justify-content-between">
                        <Link to={'/login'}><button className="btn btn-info px-2 mx-2">Login</button></Link>
                        <Link to={'/register'}><div className="btn btn-info px-2 mx-2">Register</div></Link>
                    </div>)
                    : (


                        <div>
                            <Link to={'/'}><div className="btn btn-dark px-2 mx-2" onClick={logout}>Logout </div></Link>
                        </div>

                    )

                }
            </nav>
        </>
    )
}