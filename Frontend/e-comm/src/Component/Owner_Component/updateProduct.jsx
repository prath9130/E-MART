import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [pid, setPid] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getProductsDetails();
    }, []);


//  ---------------------------------------------------------------------------------------------------
//     this function used to get product details of selected one to have reference for updating product
//  ---------------------------------------------------------------------------------------------------


    const getProductsDetails = async () => {
        await axios.get(`http://localhost:1000/view_product/${params.id}`, {
            headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
        })
            .then((response) => {
                let data = response.data;
                setName(data.name);
                setCompany(data.company);
                setPid(data.pid);
                setCategory(data.category);
                setPrice(data.price);
                setQty(data.Quantity);
            })
    }

//  ---------------------------------------------------------------------------------------------------
//     this function used to update products using update_product api with help of axios.put method
//  ---------------------------------------------------------------------------------------------------


    const updateProduct = async (e) => {
        e.preventDefault();
        let x = Number(qty)
        setQty(x.toLocaleString());

        await axios.put(`http://localhost:1000/update_product/${params.id}`,
            {
                name: name,
                price: price,
                Quantity: qty,
                category: category,
                pid: pid,
                company: company
            }, {
                headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
            })
            .then((response) => {
                alert("Product updated successfully..!");
                navigate('/products');
            })

    }

    return (
        <>
            <div className="border border-success text-center mx-auto w-50 rounded my-5">
                <div className="h3 py-3 text-uppercase bg-success text-light">Update product</div>
                <div className="mb-2 mt-3">
                    <input type="text" name="name" placeholder="Product name" value={name}
                        className="text-center rounded border border-dark w-50 py-1"
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                </div>
                <div className="my-2">
                    <input type="text" name="company" placeholder="Product company" value={company}
                        className="text-center rounded border border-success w-50 py-1"
                        onChange={(e) => setCompany(e.target.value)}
                    /><br />
                </div>
                <div className="my-2">
                    <input type="text" name="pid" placeholder="Product Id e.g.#123" value={pid}
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setPid(e.target.value)}
                    /><br />
                </div>
                <div className="my-2">
                    <input type="text" name="category" placeholder="Category" value={category}
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setCategory(e.target.value)}
                    /><br />
                </div>
                <div className="my-2">
                    <input type="text" name="price" placeholder="Price" value={price}
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setPrice(e.target.value)}
                    /><br />
                </div>
                <div className="my-2">
                    <input type="text" name="qty" placeholder="Quantity" value={qty}
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setQty(e.target.value)}
                    /><br />
                </div>
                <button className="btn btn-success mb-4" onClick={updateProduct} >Update Product</button>
            </div>
        </>
    )
}