import React, { useState } from "react";
import axios from "axios";

const CreateBill = () => {
    const [registrationNumber, SetRegistrationNumber] = useState("");
    const [wasteVolume, setWasteVolume] = useState("");
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
            wasteVolume: wasteVolume
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Bill Generated Successfully');
                    SetRegistrationNumber(""); // Clear input fields after successful submission
                    setWasteVolume("");
                    setErrorMessage(""); // Clear error message
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
            <form onSubmit={handleOneSubmit}>
                <input
                    value={registrationNumber}
                    onChange={(e) => SetRegistrationNumber(e.target.value)}
                    type="text"
                    placeholder="Vehicle Number"
                    className="input input-bordered w-full"
                />
                <input
                    value={wasteVolume}
                    onChange={(e) => setWasteVolume(e.target.value)}
                    type="text"
                    placeholder="Waste Volume"
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">
                    Generate Bill
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default CreateBill;
