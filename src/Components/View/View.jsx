import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../store/PostContext";
import { db } from "../../firebase/config";
import { query, where, getDocs, collection } from "firebase/firestore";

import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const nestedUserId = postDetails.createdBy;
      console.log("Nested User ID:", nestedUserId);

      if (nestedUserId) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("id", "==", nestedUserId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              console.log("User Document ID:", doc.id);
              console.log("User Document Data:", doc.data());
              setUserDetails(doc.data());
            });
          } else {
            console.log("No user found with nested ID:", nestedUserId);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    if (postDetails?.createdBy) {
      fetchUserDetails();
    }
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
