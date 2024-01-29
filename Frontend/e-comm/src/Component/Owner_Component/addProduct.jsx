import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [pid, setPid] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState();
    const [nerror, setNerror] = useState('')
    const [cerror, setCerror] = useState('')
    const [perror, setPerror] = useState('')
    const [cterror, setCterror] = useState('')
    const [prerror, setPrerror] = useState('')
    const [qerror, setQerror] = useState('')

    const navigate = useNavigate();

//  ---------------------------------------------------------------------------------------------------
//     this function used to add product with validations
//  ---------------------------------------------------------------------------------------------------



    const addProduct = async (e) => {
        e.preventDefault();
        let x = Number(qty)
        setQty(x.toLocaleString());

        if (!name)
            setNerror("Enter name");
        else if (!company)
            setCerror("Enter company");
        else if (!pid)
            setPerror("Enter id");
        else if (!category)
            setCterror("Enter category");
        else if (!price)
            setPrerror("Enter price");
        else if (!qty)
            setQerror("Enter quantity");
        else {
            setNerror('');
            setCerror('');
            setCterror('');
            setPerror('');
            setPrerror('');
            setQerror('');
            await axios.post('http://localhost:1000/add_product',
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
                    let data = JSON.stringify(response.data);
                    if (data) {
                        alert("Product added successfully..!!");
                        navigate('/products');
                    }
                    else {
                        alert('Failed to add product');
                    }
                })

        }
    


    }

    return (
        <>
            <div className="border border-success text-center mx-auto w-50 rounded my-5">
                <div className="h3 py-3 text-uppercase bg-success text-light">Add product</div>
                <div className="mb-2 mt-3">
                    <input type="text" name="name" placeholder="Product name"
                        className="text-center rounded border border-dark w-50 py-1"
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                    <span className="text-danger">{nerror}</span>
                </div>
                <div className="my-2">
                    <input type="text" name="company" placeholder="Product company"
                        className="text-center rounded border border-success w-50 py-1"
                        onChange={(e) => setCompany(e.target.value)}
                    /><br />
                    <span className="text-danger">{cerror}</span>
                </div>
                <div className="my-2">
                    <input type="text" name="pid" placeholder="Product Id e.g.#123"
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setPid(e.target.value)}
                    /><br />
                    <span className="text-danger">{perror}</span>
                </div>
                <div className="my-2">
                    <input type="text" name="category" placeholder="Category"
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setCategory(e.target.value)}
                    /><br />
                    <span className="text-danger">{cterror}</span>
                </div>
                <div className="my-2">
                    <input type="text" name="price" placeholder="Price"
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setPrice(e.target.value)}
                    /><br />
                    <span className="text-danger">{prerror}</span>
                </div>
                <div className="my-2">
                    <input type="text" name="qty" placeholder="Quantity"
                        className="text-center rounded border border-success w-50 py-1 "
                        onChange={(e) => setQty(e.target.value)}
                    /><br />
                    <span className="text-danger">{qerror}</span>
                </div>
                <button className="btn btn-success mb-4" onClick={addProduct} >Add Product</button>
            </div>
        </>
    )
}