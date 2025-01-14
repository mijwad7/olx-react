import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Create = () => {
  const { user } = useContext(AuthContext);
  const { firebaseApp } = useContext(FirebaseContext); // Accessing initialized Firebase
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to create a product.");
      return;
    }

    try {
      const productRef = collection(db, "products");
      await addDoc(productRef, {
        name,
        category,
        price: Number(price),
        createdBy: user.uid, // Store user ID for reference
        createdAt: new Date(),
      });

      alert("Product created successfully!");
      setName("");
      setCategory("");
      setPrice("");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />
          <button className="button" type="submit">
            Create Product
          </button>
        </form>
        <br />
      </div>
    </Fragment>
  );
};

export default Create;
