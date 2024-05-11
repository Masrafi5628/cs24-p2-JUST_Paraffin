import React, { useEffect, useState, useRef } from 'react';
import L, { point } from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const CreateMapView = () => {
    const mapRef = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false); // Flag to track map initialization

    useEffect(() => {
        fetch('http://localhost:5000/openmap')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    console.log(data);
                    setMapData(data[data.length - 1]);
                }
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
            });
    }, []); // Empty dependency array to fetch data only once

    useEffect(() => {
        if (mapData && !mapInitialized) {
            const { latitude, longitude } = mapData; // Destructure latitude and longitude from mapData

            const map = L.map(mapRef.current).setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const startPoint = L.latLng(latitude, longitude);

            L.Routing.control({
                waypoints: [startPoint],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                lineOptions: {
                    styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
                },
                addWaypoints: false
            }).addTo(map);

            setMapInitialized(true);
        }
    }, [mapData, mapInitialized]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Worker Location</h1>
            <div ref={mapRef} className="map-container" style={{ height: '500px' }}></div>
        </div>
    );
};


export default CreateMapView;