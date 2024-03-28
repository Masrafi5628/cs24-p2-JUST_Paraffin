import axios from "axios";
import { useState } from "react";

const AddVehicle = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [fuelCostLoaded, setFuelCostLoaded] = useState('');
    const [fuelCostUnloaded, setFuelCostUnLoaded] = useState('');



    const handleVehicleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/vehicles', {
            registrationNumber: registrationNumber,
            type: type,
            capacity: capacity,
            fuelCostLoaded: fuelCostLoaded,
            fuelCostUnloaded: fuelCostUnloaded
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Vehicle Added Successfully');
                }

            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <div>
            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Add Vehicle</h2>
                <form onSubmit={handleVehicleSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Registration Number"
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Type"
                            onChange={(e) => setType(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Capacity"
                            onChange={(e) => setCapacity(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Fuel Cost Loaded"
                            onChange={(e) => setFuelCostLoaded(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Fuel Cost Unloaded"
                            onChange={(e) => setFuelCostUnLoaded(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">
                            Add Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
