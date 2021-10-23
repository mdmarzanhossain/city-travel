import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import './Login.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "./firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {UserContext} from "../../App";

const Login = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let [signInUser, setSignInUser] = useState();
    const [newUser, setNewUser] = useState(false);
    const [matchPassword, setMatchPassword] = useState(true);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const app = initializeApp(firebaseConfig);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const auth = getAuth();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const {displayName, email} = result.user;
                signInUser = {name: displayName, email};
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error.code, error.message);
        });
    }

    const handleGitHubSignIn = () => {
        signInWithPopup(auth, gitHubProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const {displayName, email} = result.user;
                signInUser = {name: displayName, email};
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
            console.log(error.code, error.message);
        });
    }

    const handleSubmit = (e) => {
        console.log("handle submit",user.email, user.password);
        if (newUser && user.email && (user.password === user.confirmPassword)){
            const matchPass=true;
            setMatchPassword(matchPass);
            console.log("submit");
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                })
                .then(res=>{
                    const newUserInfo = {...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }else {
            const matchPass=false;
            setMatchPassword(matchPass);
            console.log("password incorrect");
        }

        if(!newUser && user.email && user.password){
            console.log("not submit");
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const {displayName, email} = user;
                    signInUser = {name: displayName, email};
                    setLoggedInUser(signInUser);
                    history.replace(from);
                })
                .then(res => {
                    const newUserInfo = {...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                })
                .catch((error) => {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault(); // puro page load howa bondho korbe
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            console.log("username updated successfully");
            // ...
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleBlur = (e) => {
        let isFieldValid = 'true';
        if (e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordHasNumber && isPasswordValid;
        }

        if (isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div className="row">
            <div style={{textAlign:"center"}} className="offset-md-4 col-md-4 form-container">
                <input type="checkbox" onChange={() => {setNewUser(!newUser); user.success = false}} name="newUser" id=""/>
                <label htmlFor="newUser">New User Sign up</label>

                <form className="user-form" onSubmit={handleSubmit} action="">
                    {newUser && <input placeholder="Name" name="name" onBlur={handleBlur} type="text" required/>}
                    <br/>
                    <input placeholder="Email" name="email" onBlur={handleBlur} type="text" required/>
                    <br/>
                    <input placeholder="Password" name="password" onBlur={handleBlur} type="password" required/>
                    <br/>
                    {newUser && <input placeholder="Confirm Password" name="confirmPassword" onBlur={handleBlur} type="password" required/>}
                    {newUser && <br/>}
                    <input className="btn-sign-log" type="submit" value={newUser ? 'Sign Up' : 'Log In'}/>
                </form>
                <p style={{color:"red"}}>{user.error}</p>
                {!matchPassword && <p className="password-match-text">Password do not match.</p>}
                { user.success && <p className="user-create-text" style={{color: "green"}}>User {newUser ? 'created' : 'logged in'} successfully</p>}
            </div>
            <div className="offset-md-4 col-md-4 gf-btn-container">
                <Button onClick={handleGitHubSignIn} className="gf-btn" variant="primary" type="submit">
                    Continue With GitHub
                </Button>
                <br/>
                <Button onClick={handleGoogleSignIn} className="gf-btn" variant="primary" type="submit">
                    Continue With Google
                </Button>
            </div>
        </div>
    );
};

export default Login;