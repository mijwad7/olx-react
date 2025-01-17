import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage

const Create = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to create a product.");
      return;
    }

    if (!image) {
      alert("Please upload an image for the product.");
      return;
    }

    try {
      setLoading(true);

      const imageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Image upload failed:", error);
          alert("Image upload failed. Please try again.");
        },
        async () => {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          const productRef = collection(db, "products");
          await addDoc(productRef, {
            name,
            category,
            price: Number(price),
            createdBy: user.uid,
            createdAt: new Date(),
            imageURL,
          });

          alert("Product created successfully!");
          setName("");
          setCategory("");
          setPrice("");
          setImage(null);
          navigate("/");
        }
      );
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
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
            name="name"
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
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input
            className="input"
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
          <br />
          {loading ? (
            <button className="button" type="button" disabled>
              Uploading...
            </button>
          ) : (
            <button className="button" type="submit">
              Create Product
            </button>
          )}
        </form>
        <br />
      </div>
    </Fragment>
  );
};

export default Create;
