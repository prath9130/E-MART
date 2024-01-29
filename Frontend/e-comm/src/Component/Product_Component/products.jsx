import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import img from '../Product_Component/mart.jpg';

export const Products = () => {
    const [product_list, setProductList] = useState([]);

//  ---------------------------------------------------------------------------------------------------
//     To view all products to customer from database
//  ---------------------------------------------------------------------------------------------------


//  ---------------------------------------------------------------------------------------------------
//     useEffect() to call function after rendering the component
//  ---------------------------------------------------------------------------------------------------

    useEffect(() => {
        getProductsList();
    }, []);

    const getProductsList = async () => {
        await axios.get('http://localhost:1000/view_product', {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                setProductList(response.data)
            })
    }

//  ---------------------------------------------------------------------------------------------------
//     this fucntion buy the product and store data in database
//     axios.post method used to store bought data of user in database
//  ---------------------------------------------------------------------------------------------------


    const buyProduct = async (pid, name, company, price) => {

        let data = localStorage.getItem('user');
        data = JSON.parse(data);
        let u_id = data._id;

        await axios.post('http://localhost:1000/buy', {
            buyer_id: u_id,
            name: name,
            price: price,
            pid: pid,
            company: company,
            status: "pending"
        }, {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                alert("Product Ordered successfully..!");
            })

    }

//  ---------------------------------------------------------------------------------------------------
//     this function used to serch products using search api
//  ---------------------------------------------------------------------------------------------------


    const searchText = async (e) => {
        let txt = e.target.value;
        if (txt) {
            await axios.get(`http://localhost:1000/search/${txt}`, {
                headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
            })
                .then((response) => {
                    setProductList(response.data);
                })
        }
        else {
            getProducts();
        }
    }

    return (
        <>
            <div className="container-fluid  border border-info p-0">
                <div className="h3 text-uppercase text-center bg-primary m-0 p-3">All Products</div>
                <div className="text-center bg-primary m-0 p-2">
                    <input type="text" name="search" placeholder="Search here..." onChange={searchText} className="w-25 text-center rounded " />
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                {
                    product_list.map((item, index) => {
                        return (
                            <>
                                <div className="card m-3 bg-info" style={{ width: "15rem" }}>
                                    <img src={img} class="card-img-top w-100 h-50" alt="..." />
                                    <div class="card-body">
                                        <h4 class="card-title">{item.name}</h4>
                                        <h6>company : {item.company}</h6>
                                        <h6>Prod ID : {item.pid}</h6>
                                        <h6>Category : {item.category}</h6>


                                        <div className="d-flex justify-content-around mt-3">
                                            <div className="btn btn-success" onClick={(e) => buyProduct(item.pid, item.name, item.company, item.price)}>Buy</div>
                                            <div className="fs-3"><i className='bx bx-rupee '></i>{item.price} /-</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>

            </div>
        </>
    )
}