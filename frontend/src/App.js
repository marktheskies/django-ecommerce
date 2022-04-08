import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, useParams } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<FourOhFour />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
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

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/products`)
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <main>
      <h1>Product list</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

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

const FourOhFour = () => {
  return <main>The page you are looking for was not found.</main>;
};

export default App;
