import React from 'react';
import './home.css';
import Vehicle from "../Vehicle/Vehicle";

const Home = () => {
    const vehicle = [
        {
            "img": "https://i.ibb.co/J5PLNRV/Frame.png\n",
            name: "BIKE",
            key: 1
        },
        {
            "img": "https://i.ibb.co/rsyn0tY/Frame-1.png\n",
            key:2,
            name: "CAR",
        },
        {
            "img":"https://i.ibb.co/K2CLmDy/Frame-2.png\n",
            key:3,
            name: "BUS",
        },
        {
            "img": "https://i.ibb.co/P575gZh/Group.png",
            key:4,
            name: "TRAIN",
        }
]
    return (
        <div className="row vehicle-container">
            {
                vehicle.map((info)=>

                    <Vehicle info={info}></Vehicle>
                )
            }
        </div>
    );
};

export default Home;