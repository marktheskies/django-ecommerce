import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCarousel from "../ProductCarousel";
import { MoneyFormatter } from "../localization";

const Product = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  const images = [
    `https://via.placeholder.com/549x366?text=${product.name}+product+image+1`,
    `https://via.placeholder.com/549x366?text=${product.name}+product+image+2`,
    `https://via.placeholder.com/549x366?text=${product.name}+product+image+3`,
  ];

  useEffect(() => {
    fetch(`${process.env.API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((product) => setProduct(product));
  }, []);

  return (
    <main>
      <div className="container-fluid border-bottom py-3 fw-light">
        <div className="container">
          <span className="fw-bolder fs-5">{product.category}</span>
        </div>
      </div>

      <section className="container py-4 py-md-5 border-bottom">
        <div className="row gx-5">
          <div className="col-md-7 order-md-2 mb-4 mb-md-0 ps-md-5">
            <ProductCarousel images={images} />
          </div>

          <div className="col-md-5 pe-md-5">
            <h1>{product.name}</h1>
            <p className="fs-5">
              {product ? MoneyFormatter.format(product.price) : ""}
            </p>
            <div className="d-grid">
              <button type="button" className="btn btn-primary">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-5">Product Information</h2>
        <div className="row">
          <div className="col-md-3">
            <h3 className="h4">Overview</h3>
          </div>
          <div className="col-md-9">
            {product.description
              ? product.description
                  .split("\n")
                  .map((paragraph, i) => <p key={i}>{paragraph}</p>)
              : ""}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
