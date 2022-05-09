import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [productsPaginator, setProductsPaginator] = useState({});

  useEffect(() => {
    fetch(`${process.env.API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductsPaginator(data);
      });
  }, []);

  return (
    <main>
      <h1>Product list</h1>

      <ul>
        {productsPaginator.results
          ? productsPaginator.results.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {product.name} - ${product.price}
                </Link>
              </li>
            ))
          : ""}
      </ul>
    </main>
  );
};

export default ProductList;
