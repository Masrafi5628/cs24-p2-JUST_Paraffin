import axios from "axios";
import { useState } from "react";

const WasteCollectionPlan = () => {
    const [areaofcollection, setareaofcollection] = useState('');
    const [collectionstarttime, setcollectionstarttime] = useState('');
    const [durationofcollection, setdurationofcollection] = useState('');
    const [numberoflaborers, setnumberoflaborers] = useState('');
    const [numberofvans, setnumberofvans] = useState('');
    const [expectedwaste, setexpectedwaste] = useState('');


    const handleWorkerSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/wastecollectionplan', {
                areaofcollection,
                collectionstarttime,
                durationofcollection,
                numberoflaborers,
                numberofvans,
                expectedwaste
            });

            if (response.data.status === 'ok') {
                alert('Collection Plan Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <>
                <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="common-wrapper max-w-md w-full p-6">
                        <div className="card w-full max-w-md shadow-lg bg-white">
                            <form className="card-body" onSubmit={handleWorkerSubmit}>
                                <h3 className="text-2xl font-semibold text-center mb-4">Add Collection</h3>

                                <div className="mb-4">

                                    <input
                                        type="text"
                                        placeholder="Area of Collection"
                                        onChangeCapture={(e) => setareaofcollection(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="mb-4">

                                    <input
                                        type="date"
                                        placeholder="Collection Start Time"
                                        onChange={(e) => setcollectionstarttime(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">

                                    <input
                                        type="text"
                                        placeholder="Duration of Collection"
                                        onChange={(e) => setdurationofcollection(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">

                                    <input
                                        type="number"
                                        placeholder="Number of laborers"
                                        onChange={(e) => setnumberoflaborers(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">

                                    <input
                                        type="text"
                                        placeholder="Number of Vans"
                                        onChange={(e) => setnumberofvans(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">

                                    <input
                                        type="text"
                                        placeholder="Expected Waste of Daily Solid Waste"
                                        onChange={(e) => setexpectedwaste(e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                        Add Collection
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

            </>
        </div>
    );
};

export default WasteCollectionPlan;