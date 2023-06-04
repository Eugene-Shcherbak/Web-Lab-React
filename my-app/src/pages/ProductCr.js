import React, { Fragment } from "react";
import './css/ProductCr.css'

function ProductCr(){

	const handleProductCreation = (event) => {
		event.preventDefault();
	
		const title = document.getElementById("title").value;
		const text = document.getElementById("text").value;
		const state = document.getElementById("state").value;
		const category = document.getElementById("category").value;
	
		const formData = {
            title: title,
            text: text,
            state: state,
            category: category
		};
	
		// Perform creation request
		fetch("http://127.0.0.1:5000/product", {
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
			<div className="ProductCr_body">
            <div className="ProductCr_container">
		<h2 className="ProductCr_title">Create Product</h2>
		<form className="ProductCr_form" onSubmit={handleProductCreation}>
			<label className="ProductCr_label" htmlFor="title">Title</label>
			<input type="text" id="title" name="title" required/>
			
			<label className="ProductCr_label" htmlFor="text">Text</label>
			<input type="text" id="text" name="text" required/>

			<label className="ProductCr_label" htmlFor="state">State</label>
			<input type="text" id="state" name="state" required/>

			<label className="ProductCr_label" htmlFor="category">Category</label>
			<input type="text" id="category" name="category" required/>
			
			
			<input id="regis" type="submit" value="Add product"/>
		</form>
			</div>
			</div>
        </Fragment>
    )
}

export default ProductCr;