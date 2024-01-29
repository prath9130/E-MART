import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from '../Product_Component/mart.jpg';



export const ViewProduct = () => {
    const [product_list, setProductList] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    //  ---------------------------------------------------------------------------------------------------
    //     this function fetch all the products from database using view_product api with the help of axios.get method
    //  ---------------------------------------------------------------------------------------------------



    const getProducts = async () => {
        await axios.get('http://localhost:1000/view_product', {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                setProductList(response.data)
            })
    }

    //  ---------------------------------------------------------------------------------------------------
    //     this function delete the selected product from database using delete_product api with the help of axios.get method
    //  ---------------------------------------------------------------------------------------------------



    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:1000/delete_product/${id}`, {
            headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })
            .then((response) => {
                alert("Product deleted successfully..!");
                getProducts();
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
                <div className="h3 text-uppercase text-center bg-primary m-0 p-2 ">All Products</div>
                <div className="text-center bg-primary m-0 p-2">
                    <input type="text" name="search" placeholder="Search here..." onChange={searchText} className="w-25 text-center rounded " />
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        product_list.map((item, index) => {
                            return (
                                <>
                                    <div className="card m-3 bg-info" style={{ width: "13rem" }}>
                                        <img src={img} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h4 class="card-title">{item.name}</h4>
                                            <h6>company : {item.company}</h6>
                                            <h6>Prod ID : {item.pid}</h6>
                                            <h6>Category : {item.category}</h6>
                                            <div className="fs-5"><i className='bx bx-rupee '></i>{item.price} /-</div>

                                            <div className="d-flex justify-content-around mt-3">
                                                <Link to={'/updateproduct/' + item._id}><div className="btn btn-success">update</div></Link>
                                                <div className="btn btn-danger ms-2" onClick={(e) => deleteProduct(item._id)}>delete</div>
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