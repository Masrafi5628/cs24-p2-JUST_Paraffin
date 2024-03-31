import axios from "axios";
import { useState } from "react";

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
            <h2 className="text-3xl mb-6 text-center">Add Truck</h2>
            <form onSubmit={handleOneSubmit} className="space-y-4 space-x-4">
                <input
                    type="text"
                    placeholder="Truck Number"
                    value={truckNumber}
                    onChange={(e) => setTruckNumber(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="text"
                    placeholder="Weight of Waste"
                    value={weightofWaste}
                    onChange={(e) => setWeightofWaste(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="text"
                    placeholder="Time of Arrival"
                    value={timeofArrival}
                    onChange={(e) => setTimeofArrival(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="text"
                    placeholder="Time of Departure"
                    value={timeofDeparture}
                    onChange={(e) => setTimeofDeparture(e.target.value)}
                    className="input"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Add Vehicle
                </button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddEntryTruck;
