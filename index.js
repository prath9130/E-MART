const express = require('express');
require('./Database/config');
const User = require('./Database/userSchema');
const Product = require('./Database/productSchema');
const Orders = require('./Database/ordersSchema');
const cors = require('cors');
const Jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const jwt_key = 'access';


//  ---------------------------------------------------------------------------------------------------
//     API for registration
//  ---------------------------------------------------------------------------------------------------

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    if (result) {
        Jwt.sign({ result }, jwt_key, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                res.send(null)
            }
            else {
                res.send({ result, auth: token });
            }
        })

    }
})


//  ---------------------------------------------------------------------------------------------------
//     API for login
//  ---------------------------------------------------------------------------------------------------
const u_name="Admin"
const owner_email = "admin";
const owner_pass = "admin@123";
const role = "owner"
app.post('/login', async (req, res) => {
    const { u_email, u_pass, u_role } = req.body;
    const data={u_email,u_role,u_name}
    if ((u_email === owner_email) && (u_pass === owner_pass) && (role === u_role)) {
        Jwt.sign({ data }, jwt_key, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                res.send(null)
            }
            res.send({ data , auth: token });

        })
    }
    else {
        let data = await User.findOne(req.body).select('-u_pass');
        if (data) {
            Jwt.sign({ data }, jwt_key, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    res.send(null)
                }
                res.send({ data, auth: token });

            })
        }
        else {
            res.send(null);
        }
    }
})

//  ---------------------------------------------------------------------------------------------------
//     API for add product
//  ---------------------------------------------------------------------------------------------------


app.post('/add_product', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
}
)

//  ---------------------------------------------------------------------------------------------------
//     API for view product
//  ---------------------------------------------------------------------------------------------------


app.get('/view_product', verifyToken, async (req, res) => {
    let products = await Product.find({});
    if (products.length > 0)
        res.send(products);
    else
        res.send(null);
})

//  ---------------------------------------------------------------------------------------------------
//     API for delete product
//  ---------------------------------------------------------------------------------------------------


app.delete('/delete_product/:id', verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

//  ---------------------------------------------------------------------------------------------------
//     API for view product with parameter
//  ---------------------------------------------------------------------------------------------------


app.get('/view_product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result)
        res.send(result);
    else
        res.send(null);
})

//  ---------------------------------------------------------------------------------------------------
//     API for update product
//  ---------------------------------------------------------------------------------------------------


app.put('/update_product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    if (result) {
        res.send(result);
    }
})

//  ---------------------------------------------------------------------------------------------------
//     API for serach 
//  ---------------------------------------------------------------------------------------------------


app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { pid: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

//  ---------------------------------------------------------------------------------------------------
//     API for buy product
//  ---------------------------------------------------------------------------------------------------


app.post('/buy', verifyToken, async (req, res) => {
    let order = new Orders(req.body);
    let result = await order.save();
    res.send(result);

})

//  ---------------------------------------------------------------------------------------------------
//     API for view orders
//  ---------------------------------------------------------------------------------------------------


app.get('/view_orders', verifyToken, async (req, res) => {
    let result = await Orders.find({});
    if (result)
        res.send(result);
    else
        res.send(null);
})

//  ---------------------------------------------------------------------------------------------------
//     API for view orders with paramater
//  ---------------------------------------------------------------------------------------------------


app.get('/view_orders/:id', verifyToken, async (req, res) => {
    let result = await Orders.find({ buyer_id: req.params.id });
    if (result)
        res.send(result);
    else
        res.send(null);
})

//  ---------------------------------------------------------------------------------------------------
//     API for update orders with parameter
//  ---------------------------------------------------------------------------------------------------


app.put('/update_order/:id', verifyToken, async (req, res) => {
    let result = await Orders.updateOne({ _id: req.params.id }, { $set: req.body });
    if (result) {
        res.send(result);
    }
})

//  ---------------------------------------------------------------------------------------------------
//      Function for JWT implementation using as a middleware 
//  ---------------------------------------------------------------------------------------------------


function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwt_key, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please, provide valid token..!" })
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).send({ result: "Please, add the token with header..!" })
    }


}


app.listen(1000,()=>console.log("Server started.."));