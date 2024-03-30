import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateBill = () => {
    const navigate = useNavigate();
    const [registrationNumber, SetRegistrationNumber] = useState("");
    const [wasteVolume, setWasteVolume] = useState("");
    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const handleOneSubmit = (e) => {
        e.preventDefault();



        // Check if input values are valid numbers
        if (isNaN(parseFloat(wasteVolume))) {
            setErrorMessage("Invalid waste volume. Please enter a valid number.");
            return;
        }

        // Make API call to create bill
        axios.post('http://localhost:5000/createbill', {
            registrationNumber: registrationNumber,
            wasteVolume: wasteVolume,

            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Bill Generated Successfully');
                    SetRegistrationNumber(""); // Clear input fields after successful submission
                    setWasteVolume("");
                    setDepartureLocation("");
                    setArrivalLocation("");
                    setErrorMessage(""); // Clear error message
                    navigate('/landfilldashboard/createbillpage'); // Redirect to viewgenerate page after successful submission
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
                    value={registrationNumber}
                    onChange={(e) => SetRegistrationNumber(e.target.value)}
                    type="text"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full mb-3"
                    required
                />
                <input
                    value={wasteVolume}
                    onChange={(e) => setWasteVolume(e.target.value)}
                    type="text"
                    placeholder="Waste Volume"
                    className="input input-bordered w-full  mb-3"
                    required
                />

                <input
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    type="text"
                    placeholder="Departure Location(Radian)"
                    className="input input-bordered  mb-3 w-full"
                    required
                />
                <input
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                    type="text"
                    placeholder="Arrival Location (Radian)"
                    className="input input-bordered  mb-3 w-full"
                    required
                />

                <button type="submit" className="btn btn-primary">
                    Submit and Generate Bill
                </button>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default CreateBill;
