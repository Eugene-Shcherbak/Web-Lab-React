import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/products.css';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (localStorage.username != null) {
      document.getElementById("userid").innerHTML = localStorage.username;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/product/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
    } else {
      console.error("Error fetching products");
    }
  } catch (error) {
    console.error(error);
  }
};

  const renderProducts = () => {
    return products.map((product) => (
      <li key={product.id}>
        {/*<Link className="description" to={`/Product/${product.id}`}>*/}
        <Link className="description" to={`/Product`}>
          <img src="images/Product.jpg" className="hero-img" alt="some cool product" />
          {product.title}
          <span> {product.text}</span>
        </Link>
      </li>
    ));
  };

  const handleMobileBtnClick = () => {
    document.querySelector("nav").classList.add("menu-btn");
  };

  const handleMobileBtnExitClick = () => {
    document.querySelector("nav").classList.remove("menu-btn");
  };

  return (
    <Fragment>
      <div className="products_body">
        <div className="navbar">
          <div className="products_container">
            <Link className="logo" to="/">
              <span>RMH</span>Shop
            </Link>

            <img id="mobile-cta" className="mobile-menu" src="./images/menu.svg" alt="Open navigation" onClick={handleMobileBtnClick} />

            <nav>
              <img
                id="mobile-exit"
                className="mobile-menu-exit"
                src="./images/exit.svg"
                alt="Close navigation"
                onClick={handleMobileBtnExitClick}
              />
              <ul className="primary-nav">
                <li>
                  {" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/Products">Products</Link>
                </li>
              </ul>

              <ul className="secondary-nav">
              {localStorage.username === "admin" && (
                  <li><Link to="/ProductCr">ProductCr</Link></li>
                )}
                <li>
                  {" "}
                  <Link to="/SignIn">Sign in</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/Userpage" id="userid">
                    User not logged in
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <section className="products_hero">
          <div className="products_container">
            <ul className="Products">
              {products.length > 0 ? renderProducts() : <p>Loading products...</p>}
            </ul>
          </div>
        </section>

        <div className="footer">
          <p>Yevhen Code™</p>
        </div>
      </div>
    </Fragment>
  );
}

export default Products;