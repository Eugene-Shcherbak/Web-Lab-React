import React, { Fragment, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import './css/product.css'

function Product(){
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

      const handleBuy = (event) => {
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
            <div className="product_body">
            <div className="navbar">
            <div className="container">
            <Link className="logo" to = "/"><span>RMH</span>Shop</Link>
                
                <img id="mobile-cta" className="mobile-menu" src="./images/menu.svg" alt="Open navigation" onClick={handleMobileBtnClick}/>

                <nav>
                    <img id="mobile-exit" className="mobile-menu-exit" src="./images/exit.svg" alt="Close navigation"  onClick={handleMobileBtnExitClick}/>
                    <ul className="primary-nav">
                        <li > <Link to = "/">Home</Link></li>
                        <li > <Link to = "/Products">Products</Link></li>
                    </ul>

                    <ul className="secondary-nav">
                    {localStorage.username === "admin" && (
                  <li><Link to="/ProductCr">ProductCr</Link></li>
                )}
                        <li > <Link to = "/SignIn">Signin</Link></li>
                        <li > <Link to = "/Userpage" id="userid">User not logged in</Link></li>
                    </ul>

                </nav>
            </div>
        </div>


        <div className="item-container">
            <div className="item-image">
              <img src="images/Ronchik.jpg" alt="Item_Image"/>
            </div>
            <div className="item-info">
              <h1 className="item-name">Крутий Пес</h1>
              <p className="item-description">
                Найліпший пес якого я коли небудь бачив,
                такого ні у кого немає, а у кого є,
                той бреше. Це звичайний лорем іпсум, а не опис
                плейсхолдер так би мовити, база, ґрунт,
                опора, фундамент, моноліт, наріжний камінь.
              </p>
              <p className="item-price">$9.99</p>
              <button className="item-add-to-cart" onClick={handleBuy}>Купити</button>
            </div>
          </div>

          {showMessage && (
          <div className="overlay">
            <div className="message">Product succesfully bought!</div>
          </div>
        )}

        </div>
        </Fragment>
    )
}

export default Product;