import React, { Fragment, useState } from "react";
import {Link} from 'react-router-dom';
import './css/sign-in.css'

function SignIn(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      const role = "user";
  
      try {
        const response = await fetch('http://127.0.0.1:5000/user/login', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          }
        });
  
        if (response.ok) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('role', role);
          window.location.href = '/';
        } else if (response.status === 401) {
          alert("Wrong credentials!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <Fragment>
            <div className="sign_in_body">
            <div className="sign_in_container">
		    <h2 className="sign_in_title">Sign-in</h2>
		<form className="sign_in_form" onSubmit={handleFormSubmit}>
			<label className="sign_in_label" htmlFor="username">username</label>
			<input className="sign_in_input" type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
			
			<label htmlFor="password">Password</label>
			<input className="sign_in_input" type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
			
			<input className="sign_in_input" type="submit" id ="login1" value="Login"/>
		</form>
	</div>

  <div className="Sign_in_test"><a href="https://en.wikipedia.org/wiki/Dementia">Forgot password?</a></div>



    <div className="sign_in_additional">
        <h4 className="new">
            New to RMH shop?
        </h4>

        <Link className="Sign_in_test" to ="/SignUp">Sign-up</Link>
    </div>
    </div>
        </Fragment>
    )
}

export default SignIn;