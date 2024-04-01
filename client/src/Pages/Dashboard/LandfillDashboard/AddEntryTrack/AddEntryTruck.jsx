import React, { useState } from "react";
import axios from "axios";

const AddEntryTruck = () => {
    const [truckNumber, setTruckNumber] = useState('');
    const [weightofWaste, setWeightofWaste] = useState('');
    const [timeofArrival, setTimeofArrival] = useState('');
    const [timeofDeparture, setTimeofDeparture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOneSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addtruck', {
                truckNumber,
                weightofWaste,
                timeofArrival,
                timeofDeparture,
            });
            if (response.data.status === 'ok') {
                alert('Truck Added Successfully');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('An error occurred while adding the truck');
            }
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl mb-6 text-center font-bold">Add Entry Truck</h2>
            <form onSubmit={handleOneSubmit} className="space-y-4">
                <div>
                    <label htmlFor="truckNumber" className="block text-gray-500 font-bold mb-5">Truck Number</label>
                    <input
                        type="text"
                        id="truckNumber"
                        placeholder="Enter truck number"
                        value={truckNumber}
                        onChange={(e) => setTruckNumber(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="weightofWaste" className="block text-gray-500 mb-5 font-bold">Weight of Waste</label>
                    <input
                        type="text"
                        id="weightofWaste"
                        placeholder="Enter weight of waste"
                        value={weightofWaste}
                        onChange={(e) => setWeightofWaste(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="timeofArrival" className="block text-gray-500 mb-5 font-bold">Time of Arrival</label>
                    <input
                        type="text"
                        id="timeofArrival"
                        placeholder="Enter time of arrival"
                        value={timeofArrival}
                        onChange={(e) => setTimeofArrival(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="timeofDeparture" className="block text-gray-500 mb-5 font-bold">Time of Departure</label>
                    <input
                        type="text"
                        id="timeofDeparture"
                        placeholder="Enter time of departure"
                        value={timeofDeparture}
                        onChange={(e) => setTimeofDeparture(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Add Vehicle
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddEntryTruck;
