import axios from "axios";
import { useState } from "react";

const AddSTS = () => {
    const [wardNumber, setWardNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleStsSubmit = (e) => {
        e.preventDefault();
        console.log(wardNumber, capacity, latitude, longitude);

        axios.post('http://localhost:5000/sts', {
            wardNumber: wardNumber,
            capacity: capacity,
            latitude: latitude,
            longitude: longitude
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('STS Added Successfully');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Add STS</h2>
                <form onSubmit={handleStsSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Ward Number"
                            onChange={(e) => setWardNumber(e.target.value)}
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

                        <button type="submit" className="btn btn-primary">
                            Add STS
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSTS;
