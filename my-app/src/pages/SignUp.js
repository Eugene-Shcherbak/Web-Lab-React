import React, { Fragment } from "react";
import './css/sign-up.css'

function SignUp(){

	const handleRegistration = (event) => {
		event.preventDefault();
	
		const username = document.getElementById("username").value;
		const name = document.getElementById("name").value;
		const surname = document.getElementById("surname").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirm_password = document.getElementById("confirm_password").value;
	
		// Check if passwords match
		if (password !== confirm_password) {
		  alert("Passwords do not match!");
		  return;
		}
	
		const formData = {
		  username: username,
		  firstname: name,
		  lastname: surname,
		  email: email,
		  password: password
		};
	
		// Perform registration request
		fetch("http://127.0.0.1:5000/user", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(formData)
		})
		  .then(response => {
			console.log(response);
			if (response.ok) {
			  window.location.href = "/";
			}
		  })
		  .catch(error => console.error(error));
	  };

    return (
        <Fragment>
			<div className="sign_up_body">
            <div className="sign_up_container">
		<h2 className="sign_up_title">Sign Up</h2>
		<form className="sign_up_form" data-testid="sign-up-form" onSubmit={handleRegistration}>
			<label className="sign_up_label" htmlFor="username">Username</label>
			<input type="text" id="username" name="username" required/>
			
			<label className="sign_up_label" htmlFor="email">Email</label>
			<input type="email" id="email" name="email" required/>

			<label className="sign_up_label" htmlFor="name">name</label>
			<input type="name" id="name" name="name" required/>

			<label className="sign_up_label" htmlFor="surname">surname</label>
			<input type="surname" id="surname" name="surname" required/>
			
			<label className="sign_up_label" htmlFor="password">Password</label>
			<input type="password" id="password" name="password" required/>
			
			<label className="sign_up_label" htmlFor="confirm_password">Confirm Password</label>
			<input type="password" id="confirm_password" name="confirm_password" required/>
			
			<input id="regis" type="submit" value="Sign Up"/>
		</form>
			</div>
			</div>
        </Fragment>
    )
}

export default SignUp;