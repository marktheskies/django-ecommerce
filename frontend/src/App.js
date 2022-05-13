import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductList from "./pages/ProductList";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
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
