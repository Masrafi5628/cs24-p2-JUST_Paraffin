import axios from "axios";
import { useState } from "react";

const AddLandfillSite = () => {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [operationalTimespan, setOperationalTimespan] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [managers, setManagers] = useState([]); // State to hold selected managers

    const handleLandfillSubmit = (e) => {
        e.preventDefault();
        console.log(name, capacity, operationalTimespan, latitude, longitude, managers);

        axios.post('http://localhost:5000/landfill', {
            name: name,
            capacity: capacity,
            operationalTimespan: operationalTimespan,
            latitude: latitude,
            longitude: longitude,
            managers: managers // Include managers in the request body
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Landfill Site Added Successfully');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Add Landfill Site</h2>
                <form onSubmit={handleLandfillSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Landfill Site Name"
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Capacity"
                            onChange={(e) => setCapacity(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Operational Timespan"
                            onChange={(e) => setOperationalTimespan(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Latitude"
                            onChange={(e) => setLatitude(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            onChange={(e) => setLongitude(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />

                        {/* Input field to select managers */}
                        <input
                            type="text"
                            placeholder="Enter Manager IDs (comma-separated)"
                            onChange={(e) => setManagers(e.target.value.split(','))}
                            className="input input-bordered w-full"
                        />

                        <button type="submit" className="btn btn-primary">
                            Add Landfill Site
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLandfillSite;
