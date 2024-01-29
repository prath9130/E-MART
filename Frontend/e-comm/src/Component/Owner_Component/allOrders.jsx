import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const All_Orders = () => {
    const [product_list, setProductList] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        getOrders();
    }, []);

//  ---------------------------------------------------------------------------------------------------
//     this function used to fetch all orders using view_orders api
//  ---------------------------------------------------------------------------------------------------


    const getOrders = async () => {

        await axios.get("http://localhost:1000/view_orders", {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                setProductList(response.data)
            })
    }

//  ---------------------------------------------------------------------------------------------------
//     this function used to change the status of order 
//  ---------------------------------------------------------------------------------------------------

    const changeStatus=async(status,id)=>{
        await axios.put(`http://localhost:1000/update_order/${id}`,
            {
                status:status
            }, {
                headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
            })
            .then((response) => {
                alert("Status updated successfully..!");
                navigate("/all_orders");
            })
    }

    return (
        <>
            <div className="container my-5 border border-info p-0">
                <div className="h3 text-uppercase text-center bg-info m-0 p-3">Your Orders</div>
                <div className="table-responsive">
                <table className="table table-info text-center table-striped m-0 p-0">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Buyer ID</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price (INR)</th>
                            <th>Id</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product_list.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.buyer_id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.company}</td>
                                            <td>{item.price}</td>
                                            <td>{item.pid}</td>
                                            {
                                                item.status=="pending" ?  
                                                <td className="text-primary">{item.status}</td>
                                                :
                                                <td className="text-success">{item.status}</td>
                                            }
                                            <td>
                                                <div className="btn btn-warning " onClick={(e)=>changeStatus("pending",item._id)}>Pending</div>
                                                <div className="btn btn-success ms-2" onClick={(e)=>changeStatus("delivered",item._id)}>Delivered</div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}