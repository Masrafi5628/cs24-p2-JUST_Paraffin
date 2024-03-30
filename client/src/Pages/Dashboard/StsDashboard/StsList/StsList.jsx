import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StsList = () => {
    const navigate = useNavigate();

    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    console.log(departureLocation, arrivalLocation);

    const handleOneSubmit = (e) => {
        e.preventDefault();

        console.log(departureLocation, arrivalLocation);

        // Make API call to create bill
        axios.post('http://localhost:5000/route-view', {

            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Route Generated Successfully');

                    setDepartureLocation("");
                    setArrivalLocation("");
                    setErrorMessage(""); // Clear error message
                    navigate('/stsdashboard/createmap'); // Redirect to viewgenerate page after successful submission
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An error occurred while generating the bill');
                }
            });
    }



    return (
        <div>
            <form onSubmit={handleOneSubmit} className="f-flex flex-col max-w-screen-md mx-auto">


                <input
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    type="text"
                    placeholder="Departure Location"
                    className="input input-bordered  mb-3 w-full"
                    required
                />
                <input
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                    type="text"
                    placeholder="Arrival Location"
                    className="input input-bordered  mb-3 w-full"
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