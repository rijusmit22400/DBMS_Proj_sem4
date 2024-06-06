import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/Card";
import { useLocation, useParams } from "react-router-dom";
import "./Products.css";


function Products() {
  const location = useLocation();
    const params = new URLSearchParams(location.search);
    let username = params.get('name');
    let key = params.get('key');
    if(username === null || username !== localStorage.getItem("user")){
        username = "guest";
    }
    
    if(key === null || key !== localStorage.getItem("password")){
        key = "no-key";
    }
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const fetching = async () => {
    const response = await axios.get("http://localhost:5000/call/product/"+id);
    setProducts(response.data.items);
    setCategory(response.data.name);
  };

  useEffect(() => {
    fetching();
  },[]);
  return (
    <div>
      <Navbar/>
      <div id="heading">
        <p>{category}</p>
      </div>
      {products.map((product,index) => {
        return <Card key={index} id={product.p_id} name={product.item} description={product.description} price={product.price} quantity={product.stock}></Card>
      })}<Footer/>
    </div>
  );
}

export default Products;