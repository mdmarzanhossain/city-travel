import React from 'react';
import './vehicle.css';
import {Link} from "react-router-dom";

const Vehicle = (props) => {
    const {img , name} = props.info;

    const handleDestination = () => {
        console.log("click")
    }

    return (
        <div className="col-md-3 col-container">
            <div className="img-container ">
                <Link to={"/destination"} onClick={handleDestination}>
                    <img src={img}>
                    </img>
                    <h4>{name}</h4>
                </Link>
            </div>
        </div>
    );
};

export default Vehicle;