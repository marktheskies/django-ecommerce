import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((product) => setProduct(product));
  }, []);

  return (
    <main>
      <h1>Product detail</h1>
      <pre>{JSON.stringify(product)}</pre>
    </main>
  );
};

export default Product;
