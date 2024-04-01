import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
    const navigate = useNavigate();
    const [registrationNumber, setRegistrationNumber] = useState("");
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
                    setRegistrationNumber(""); // Clear input fields after successful submission
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
        <>
            <h2 className="text-3xl mb-2 text-center font-semibold">Create Bill</h2>
            <div className="flex justify-center items-center h-screen">

                <form onSubmit={handleOneSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">
                            Vehicle Number
                        </label>
                        <input
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            type="text"
                            id="registrationNumber"
                            placeholder="Vehicle Number"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wasteVolume">
                            Waste Volume
                        </label>
                        <input
                            value={wasteVolume}
                            onChange={(e) => setWasteVolume(e.target.value)}
                            type="text"
                            id="wasteVolume"
                            placeholder="Waste Weight (Ton)"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureLocation">
                            Departure Location
                        </label>
                        <input
                            value={departureLocation}
                            onChange={(e) => setDepartureLocation(e.target.value)}
                            type="text"
                            id="departureLocation"
                            placeholder="Departure Location"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrivalLocation">
                            Arrival Location
                        </label>
                        <input
                            value={arrivalLocation}
                            onChange={(e) => setArrivalLocation(e.target.value)}
                            type="text"
                            id="arrivalLocation"
                            placeholder="Arrival Location"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Submit and Generate Bill
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
                </form>
            </div>

        </>
    );
};

export default CreateBill;
