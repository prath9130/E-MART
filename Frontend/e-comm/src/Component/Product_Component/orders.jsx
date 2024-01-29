import axios from "axios";
import React, { useEffect, useState } from "react";



export const Orders = () => {
    const [product_list, setProductList] = useState([]);


//  ---------------------------------------------------------------------------------------------------
//     useEffect() help us to call function or do task after rendering
//     here it will help us to get orders after buying products
//  ---------------------------------------------------------------------------------------------------


    useEffect(() => {
        getOrders();
    }, []);

//  ---------------------------------------------------------------------------------------------------
//     this function fetch all the orders from database using view_orders api using axios.get method
//  ---------------------------------------------------------------------------------------------------


    const getOrders = async () => {
    
        let data=localStorage.getItem('user');
        data=JSON.parse(data);
        let u_id=data._id;  

        await axios.get(`http://localhost:1000/view_orders/${u_id}`,{
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                setProductList(response.data)
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
                            <th>Name</th>
                            <th>Company</th>
                            <th>Price (INR)</th>
                            <th>Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product_list.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
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