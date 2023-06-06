import React, { Fragment, useEffect } from "react";
import {Link} from 'react-router-dom';
import './css/main.css'

function Index1(){


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
    
    return (
        <Fragment >
            <div className="main_body">
            <div className="navbar">
            <div className="container">
                <Link className="logo" to = "/"><span>RMH</span>Shop</Link>
                <img id="mobile-cta" className="mobile-menu" src="./images/menu.svg" alt="Open navigation" onClick={handleMobileBtnClick}/>

                <nav>
                    <img id="mobile-exit" className="mobile-menu-exit" src="./images/exit.svg" alt="Close navigation" onClick={handleMobileBtnExitClick}/>
                    <ul className="primary-nav">

                        <li > <Link to = "/">Home</Link></li>
                        <li > <Link to = "/Products">Products</Link></li>
                    </ul>

                    <ul className="secondary-nav">
                    {localStorage.username === "admin" && (
                  <li><Link to="/ProductCr">ProductCr</Link></li>
                )}
                        <li > <Link to = "/SignIn">Sign in</Link></li>
                        <li > <Link to = "/Userpage" id="userid">User not logged in</Link></li>
                    </ul>

                </nav>
            </div>
        </div>
        <section className="main_hero">
            <div className="main_container">
                <div className="left-col">
                    <p className="subhead">Fast &amp; Reliable Shop</p>
                    <h1>For Your Pets</h1>

                    <div className="main_hero-cta">

                        <Link className="primary-cta" to = "/Products">See our prodcuts</Link>
                        <Link className="secondary-cta" to = "/SignIn">Sign in</Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="features-section">
            <div className="main_container">
                <ul className="features-list">
                    <li>Amazing Products</li>
                    <li>Affordable Prices</li>
                    <li>Worldwide Shipping</li>
                </ul>

                <img src="./images/Ronchik.jpg" alt="Beautiful dog"/>
            </div>
        </section>


        <section className="testimonials-section">
            <div className="main_container">
                <ul>
                    <li>
                        <img src="./images/Person1.jpg" alt="Person1"/>

                        <blockquote>"Prodcuts so good that they can last for years!"</blockquote>
                        <blockquote>- Joe Deez</blockquote>
                    </li>
                    <li>
                        <img src="./images/Person2.jpg" alt="Person2"/>

                        <blockquote>
                            "They sell the best quality items! Also This comment is long 
                            to show that the quote can be long and still look good.
                            It should absolutely be working and 
                            if it's not then that's kinda sad. 
                        </blockquote>
                        <blockquote>- Vae Slugma</blockquote>
                    </li>
                    <li>
                        <img src="./images/Person3.jpg" alt="Person3"/>

                        <blockquote>"My cat loves their zaza!"</blockquote>
                        <blockquote>- Seth Draggin</blockquote>
                    </li>
                </ul>
            </div>
        </section>

        <section className="location-section">
                <div className="main_container">
                    <div className="location-left">
                        <h2>We also have a physical shop!</h2>
                    </div>
                    <div className="location-rgiht">
                        <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.3626206134554!2d24.012248115863677!3d49.83564363935322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7a31f0dccd%3A0x9869cc7025bc8e3f!2sLviv%20Polytechnic%20National%20University!5e0!3m2!1sen!2sua!4v1679761326433!5m2!1sen!2sua"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">  
                        </iframe>
                    </div>
                </div>
        </section>

        <div className="footer">
            <p>Yevhen Code™</p>
        </div>
          
        </div>
        </Fragment>
    )
}

export default Index1;