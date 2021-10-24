import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 23.8221934,
    lng: 90.4219536
};

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAoIVRfeNFhQvuyek_O0lt8C-yMNVtnt5E"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)