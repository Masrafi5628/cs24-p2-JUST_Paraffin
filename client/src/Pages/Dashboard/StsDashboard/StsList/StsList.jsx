import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StsList = () => {
    const navigate = useNavigate();

    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOneSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/route-view', {
                departureLocation,
                arrivalLocation
            });

            if (response.data.status === 'ok') {
                alert('Route Generated Successfully');
                setDepartureLocation("");
                setArrivalLocation("");
                setErrorMessage(""); // Clear error message
                navigate('/stsdashboard/createmap'); // Redirect to viewgenerate page after successful submission
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('An error occurred while generating the bill');
            }
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-8 mx-auto max-w-md">
            <form onSubmit={handleOneSubmit} className="flex flex-col space-y-4">
                <input
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    type="text"
                    placeholder="Departure Location"
                    className="input input-bordered"
                    required
                />
                <input
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                    type="text"
                    placeholder="Arrival Location"
                    className="input input-bordered"
                    required
                />
                <button type="submit" className="btn btn-primary">
                    Find Optimal Route
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default StsList;
