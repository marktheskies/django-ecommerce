import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Product from "./pages/Product";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductList from "./pages/ProductList";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<FourOhFour />} />
      </Route>
    </Routes>
  );
};

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
};

const FourOhFour = () => {
  return <main>The page you are looking for was not found.</main>;
};

export default App;
