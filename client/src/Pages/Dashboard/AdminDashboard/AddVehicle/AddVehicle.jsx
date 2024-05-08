import axios from "axios";
import { useState } from "react";

const AddVehicle = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [fuelCostLoaded, setFuelCostLoaded] = useState('');
    const [fuelCostUnloaded, setFuelCostUnLoaded] = useState('');

    const handleVehicleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/vehicles', {
                registrationNumber,
                type,
                capacity,
                fuelCostLoaded,
                fuelCostUnloaded
            });

            if (response.data.status === 'ok') {
                alert('Vehicle Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* <div className="max-w-md mx-auto py-20">
            <h2 className="text-3xl mb-10 text-center font-bold">Add Vehicle</h2>
            <form onSubmit={handleVehicleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    placeholder="Registration Number"
                    required
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <input
                    type="text"
                    placeholder="Type"
                    required
                    onChange={(e) => setType(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <input
                    type="text"
                    required
                    placeholder="Capacity"
                    onChange={(e) => setCapacity(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <input
                    type="text"
                    placeholder="Fuel Cost Loaded"
                    required
                    onChange={(e) => setFuelCostLoaded(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <input
                    type="text"
                    placeholder="Fuel Cost Unloaded"
                    onChange={(e) => setFuelCostUnLoaded(e.target.value)}
                    className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Add Vehicle
                </button>
            </form>
        </div> */}

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleVehicleSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Add Vehicle</h3>

                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Registration Name
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Registration Number"
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Type
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Type"
                                    onChange={(e) => setType(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Capacity
                                </label> */}
                                <input
                                    type="text"

                                    placeholder="Capacity"
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Coast Loaded
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Fuel Cost Loaded"

                                    onChange={(e) => setFuelCostLoaded(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Coast Unloaded
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Fuel Cost Unloaded"
                                    onChange={(e) => setFuelCostUnLoaded(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Add Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AddVehicle;
