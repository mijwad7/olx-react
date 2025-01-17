import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../store/PostContext";
import Heart from "../../assets/Heart";
import "./Post.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");

      try {
        const snapshot = await getDocs(productsCollection); // Fetch the documents
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts); // Update state with fetched products
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the async function to fetch products
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>All Products</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                navigate("/view");
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                {product.imageURL ? (
                  <img src={product.imageURL} alt={product.name} />
                ) : (
                  <img src="default-image-path.jpg" alt="default" />
                )}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.date || "Unknown Date"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
