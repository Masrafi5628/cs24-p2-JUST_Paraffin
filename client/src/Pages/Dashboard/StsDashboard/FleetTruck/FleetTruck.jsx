import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StsList = () => {
    const navigate = useNavigate();
    const [volumeOfWaste, setVolumeOfWaste] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    console.log(volumeOfWaste);

    const handleOneSubmit = (e) => {
        e.preventDefault();

        // console.log(departureLocation, arrivalLocation);

        // Make API call to create bill
        axios.post('http://localhost:5000/fleettruck', {

            volumeOfWaste: volumeOfWaste
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Route Generated Successfully');

                    setVolumeOfWaste("");
                    setErrorMessage(""); // Clear error message
                    navigate('/stsdashboard/fleetview'); // Redirect to viewgenerate page after successful submission
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    navigate('/stsdashboard/fleetview');
                    // setErrorMessage(err.response.data.message);
                } else {
                    // setErrorMessage('An error occurred while generating the bill');
                    navigate('/stsdashboard/fleetview');
                }
            });
    }



    return (
        <div>
            <form onSubmit={handleOneSubmit} className="f-flex flex-col max-w-screen-md mx-auto">


                <input
                    value={volumeOfWaste}
                    onChange={(e) => setVolumeOfWaste(e.target.value)}
                    type="text"
                    placeholder="Departure Location"
                    className="input input-bordered  mb-3 w-full"
                    required
                />


                <button type="submit" className="btn btn-primary">
                    Volume of Waste
                </button>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default StsList;