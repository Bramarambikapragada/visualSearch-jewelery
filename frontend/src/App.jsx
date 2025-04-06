import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layout";
import Body from "./Components/Body";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Components/Logout";

function App() {
  return (
    <>
    <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
    <Router>
      <Routes>
        {/* Routes with Header */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Body />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
        </Route>

        {/* Routes without Header */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
