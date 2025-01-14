import React from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import {useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import {useNavigate} from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
  
        return updateProfile(result.user, { displayName: username })
          .then(() => {

            const usersCollection = collection(db, "users");
            return addDoc(usersCollection, {
              id: result.user.uid,
              username: username,
              phone: phone,
            });
          })
          .then(() => {
            navigate("/login");
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            defaultValue="Doe"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
