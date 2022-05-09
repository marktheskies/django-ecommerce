import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoneyFormatter } from "./localization";

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
      <div className="container-fluid border-bottom py-3 fw-light">
        <div className="container">
          <h1 className="fw-bolder fs-5 ms-0">All Products</h1>
        </div>
      </div>

      <section className="container-fluid bg-light py-4 py-md-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-5">
            {productsPaginator.results
              ? productsPaginator.results.map((product) => (
                  <div key={product.id} className="col">
                    <div className="card h-100 p-5 border-0 shadow-sm product-card">
                      <img
                        src={`https://via.placeholder.com/200x200?text=${product.name}+product+image+1`}
                        className="card-img-top mb-3"
                        alt={product.name}
                      />
                      <div className="card-body p-0">
                        <h5 className="card-title">
                          <Link
                            to={`/products/${product.id}`}
                            className="stretched-link text-decoration-none text-dark"
                          >
                            {product.name}
                          </Link>
                        </h5>
                        <p className="card-text text-lighter">
                          {MoneyFormatter.format(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductList;
