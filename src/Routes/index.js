import React from "react";
import "tailwindcss/dist/base.min.css";
import { Routes, Route} from "react-router-dom";
import CreateUser from "../Pages/CreateUser/CreateUser";
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Products from "../Pages/Products/Products";

  function RoutesApp() {
    return(
    <Routes>
      <Route path='/' exact element={<HomePage />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/createuser' exact element={<CreateUser />} />
      <Route path='/products' exact element={<Products />} />
    </Routes>   
    )}

    export default RoutesApp;