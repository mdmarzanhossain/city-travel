import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import Destination from "./components/Destination/Destination";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {createContext, useState} from "react";

export const UserContext = createContext();
function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
            <Header></Header>
            <Switch>
                <Route path="/home">
                    <Home></Home>
                </Route>
                <PrivateRoute path="/destination">
                    <Destination></Destination>
                </PrivateRoute>
                <Route path="/blog">
                    <Blog></Blog>
                </Route>
                <Route path="/contact">
                    <Contact></Contact>
                </Route>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/signUp">
                    <SignUp></SignUp>
                </Route>
            </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
