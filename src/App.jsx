import { useState, useEffect, useContext } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import Post from "./store/PostContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  const { setUser } = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <>
    <Post>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
    </>
  );
}

export default App;
