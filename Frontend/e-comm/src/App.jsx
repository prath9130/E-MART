import { Navbar } from './Component/navbar'
import { Welcome } from './Component/welcome'
import { Login } from './Component/login'
import {Routes,Route} from 'react-router-dom'
import { Register } from './Component/register';
import './app.css';
import { Owners_Login } from './Component/owners_login';
import { Profile } from './Component/Product_Component/Profile';
import { Products } from './Component/Product_Component/products';
import { Orders } from './Component/Product_Component/orders';
import { ViewProduct } from './Component/Owner_Component/viewProduct';
import { AddProduct } from './Component/Owner_Component/addProduct';
import { UpdateProduct } from './Component/Owner_Component/updateProduct';
import { All_Orders } from './Component/Owner_Component/allOrders';


function App() {

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/owner_login' element={<Owners_Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/view_products' element={<Products />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/all_orders' element={<All_Orders />} />
        <Route path='/updateproduct/:id' element={<UpdateProduct />} />
        <Route path='/products' element={<ViewProduct />} />

      </Routes>
    </>
  )
}

export default App;
