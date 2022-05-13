import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light">
      <section className="container border-bottom py-4">
        <div className="row">
          <div className="col-md-4 h6">Django Ecommerce</div>
          <div className="col-md-4">
            <h2 className="h6">Categories</h2>
          </div>
          <div className="col-md-4">
            <h2 className="h6">Legal</h2>
          </div>
        </div>
      </section>

      <section className="container py-4">
        Copyright © Mark Harris 2022. All rights reserved.
      </section>
    </footer>
  );
};

export default Footer;
