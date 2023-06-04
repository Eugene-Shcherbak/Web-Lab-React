import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css/userpage.css';

function Userpage() {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (localStorage.username != null) {
      document.getElementById("userid").innerHTML = localStorage.username;
    }
  }, []);

  const handleMobileBtnClick = () => {
    document.querySelector('nav').classList.add('menu-btn');
  };

  const handleMobileBtnExitClick = () => {
    document.querySelector('nav').classList.remove('menu-btn');
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/user/logout', {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.clear();
        window.location.reload(true);
        window.location.replace('/');
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreditCardSubmit = (event) => {
    event.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    // Perform credit card submission logic here
    // You can access the credit card information from the form fields
  };

  return (
    <Fragment>
      <div className="body_userpage">
        <div className="navbar">
          <div className="container">
            <Link className="logo" to="/"><span>RMH</span>Shop</Link>

            <img id="mobile-cta" className="mobile-menu" src="./images/menu.svg" alt="Open navigation" onClick={handleMobileBtnClick} />

            <nav>
              <img id="mobile-exit" className="mobile-menu-exit" src="./images/exit.svg" alt="Close navigation" onClick={handleMobileBtnExitClick} />
              <ul className="primary-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Products">Products</Link></li>
              </ul>

              <ul className="secondary-nav">
                {localStorage.username === "admin" && (
                  <li><Link to="/ProductCr">ProductCr</Link></li>
                )}
                <li><Link to="/SignIn">Signin</Link></li>
                <li><Link to="/Userpage" id="userid">User not logged in</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="cardcont">
        <div className="credit-card-form">
          <h2>Enter Credit Card Information</h2>
          <form onSubmit={handleCreditCardSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input type="text" id="expirationDate" name="expirationDate" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>

        <div className="buttoncont">
          <button className="logoutbtn" id="logout1" onClick={handleLogout}>Log out</button>
        </div>

        {showMessage && (
          <div className="overlay">
            <div className="message">Card info was added</div>
          </div>
        )}
        
      </div>
    </Fragment>
  );
}

export default Userpage;