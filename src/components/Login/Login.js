import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import './Login.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "./firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {UserContext} from "../../App";

const Login = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let [signInUser, setSignInUser] = useState();

    const app = initializeApp(firebaseConfig);
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const {displayName, email} = result.user;
                signInUser = {name: displayName, email};
                setLoggedInUser(signInUser);
                history.replace(from);
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return (
        <div className="row">
            <div className="offset-md-4 col-md-4 form-container">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <Form.Label>Don't have an account? <Link className="sign-up" to="/signUp">Create account</Link></Form.Label>
            </div>
            <div className="offset-md-4 col-md-4 gf-btn-container">
                <Button className="gf-btn" variant="primary" type="submit">
                    Continue With Facebook
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