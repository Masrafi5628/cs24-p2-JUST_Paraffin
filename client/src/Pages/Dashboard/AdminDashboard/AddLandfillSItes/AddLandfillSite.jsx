import axios from "axios";
import { useState } from "react";

const AddLandfillSite = () => {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [operationalTimespan, setOperationalTimespan] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [managers, setManagers] = useState([]); // State to hold selected managers

    const handleLandfillSubmit = async (e) => {
        e.preventDefault();
        console.log(name, capacity, operationalTimespan, latitude, longitude, managers);

        try {
            const response = await axios.post('http://localhost:5000/landfill', {
                name,
                capacity,
                operationalTimespan,
                latitude,
                longitude,
                managers // Include managers in the request body
            });

            if (response.data.status === 'ok') {
                alert('Landfill Site Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            {/* <div className="max-w-md mx-auto py-20">
                <h2 className="text-3xl mb-10 text-center font-bold">Add Landfill Site</h2>
                <form onSubmit={handleLandfillSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <input
                        type="text"
                        placeholder="Landfill Site Name"
                        onChange={(e) => setName(e.target.value)}
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
                        placeholder="Operational Timespan"
                        onChange={(e) => setOperationalTimespan(e.target.value)}
                        className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Latitude (Degree)"
                        onChange={(e) => setLatitude(e.target.value)}
                        className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline mb-4"
                        required
                    />


                    <input
                        type="text"
                        placeholder="Longitude (Degree)"
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

                    <button type="submit" className="btn btn-primary w-full">
                        Add Landfill Site
                    </button>
                </form>
            </div> */}

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleLandfillSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Add Landfill Site</h3>

                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Landfill Site Name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Capacity"
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Operational Timespan"
                                    onChange={(e) => setOperationalTimespan(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Latitude (Degree)"
                                    onChange={(e) => setLatitude(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Longitude (Degree)"
                                    onChange={(e) => setLongitude(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Enter Manager IDs (comma-separated)"
                                    onChange={(e) => setManagers(e.target.value.split(','))}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Add Landfill
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AddLandfillSite;
