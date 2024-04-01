import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';


const CreateMapPage = () => {
    const mapRef = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false); // Flag to track map initialization

    useEffect(() => {
        fetch('http://localhost:5000/createmap')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setMapData(data[data.length - 1]);
                }
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
            });
    }, []); // Empty dependency array to fetch data only once

    useEffect(() => {
        if (mapData && !mapInitialized) { // Check if map data is available and map is not initialized
            const map = L.map(mapRef.current).setView([mapData.lat1, mapData.long1], 13); // Initial map center

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const startPoint = L.latLng(mapData.lat1, mapData.long1);
            const endPoint = L.latLng(mapData.lat2, mapData.long2);

            L.Routing.control({
                waypoints: [startPoint, endPoint],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                lineOptions: {
                    styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
                },
                addWaypoints: false
            }).addTo(map);

            setMapInitialized(true); // Set map initialization flag
        }
    }, [mapData, mapInitialized]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Map with Route</h1>
            <div ref={mapRef} className="map-container" style={{ height: '500px' }}></div>
        </div>
    );
};

export default CreateMapPage;
