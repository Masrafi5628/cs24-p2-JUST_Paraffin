import axios from "axios";
import { useState } from "react";

const AddEntryTruck = () => {
    const [truckNumber, setTruckNumber] = useState('');
    const [weightofWaste, setWeightofWaste] = useState('');
    const [timeofArrival, setTimeofArrival] = useState('');
    const [timeofDeparture, setTimeofDeparture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOneSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/addtruck', {
            truckNumber: truckNumber,
            weightofWaste: weightofWaste,
            timeofArrival: timeofArrival,
            timeofDeparture: timeofDeparture,
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Truck Added Successfully');
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An error occurred while adding the truck');
                }
            });
    }

    return (
        <div>
            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Add Truck</h2>
                <form onSubmit={handleOneSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Truck Number"
                            value={truckNumber}
                            onChange={(e) => setTruckNumber(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Weight of Waste"
                            value={weightofWaste}
                            onChange={(e) => setWeightofWaste(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Time of Arrival"
                            value={timeofArrival}
                            onChange={(e) => setTimeofArrival(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Time of Departure"
                            value={timeofDeparture}
                            onChange={(e) => setTimeofDeparture(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">
                            Add Vehicle
                        </button>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryTruck;
