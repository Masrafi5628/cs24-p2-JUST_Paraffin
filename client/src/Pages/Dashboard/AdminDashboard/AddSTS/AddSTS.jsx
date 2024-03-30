import axios from "axios";
import { useState } from "react";

const AddSTS = () => {
    const [wardNumber, setWardNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [managers, setManagers] = useState([]);
    const [location, setLocation] = useState('');
    const [truckNumber, setTruckNumber] = useState('');
    const [truckCapacity, setTruckCapacity] = useState('');

    const handleStsSubmit = async (e) => {
        e.preventDefault();
        // Validate inputs
        if (!wardNumber || !capacity || !location || !latitude || !longitude || !truckNumber || !truckCapacity) {
            alert("Please provide all required fields.");
            return;
        }
        // Convert truckCapacity to a number
        const truckCap = parseInt(truckCapacity);
        if (isNaN(truckCap) || truckCap <= 0) {
            alert("Please provide a valid truck capacity.");
            return;
        }
        // Send the request
        try {
            const response = await axios.post('http://localhost:5000/sts', {
                wardNumber,
                capacity,
                location,
                latitude,
                longitude,
                managers,
                trucks: [{
                    truckNumber,
                    capacity: truckCapacity
                }]
            });

            if (response.data.status === 'ok') {
                alert('STS Added Successfully');
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while processing your request.");
        }
    }

    return (
        <div className="max-w-md mx-auto py-20">
            <h2 className="text-3xl mb-10 text-center font-bold">Add STS</h2>
            <form onSubmit={handleStsSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    placeholder="Ward Number"
                    onChange={(e) => setWardNumber(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Capacity"
                    onChange={(e) => setCapacity(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    onChange={(e) => setLatitude(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    onChange={(e) => setLongitude(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Manager IDs (comma-separated)"
                    onChange={(e) => setManagers(e.target.value.split(','))}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <input
                    type="text"
                    placeholder="Truck Number"
                    onChange={(e) => setTruckNumber(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Truck Capacity"
                    onChange={(e) => setTruckCapacity(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Add STS
                </button>
            </form>
        </div>
    );
};

export default AddSTS;
