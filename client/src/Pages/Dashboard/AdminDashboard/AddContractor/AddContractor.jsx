import axios from "axios";
import { useState } from "react";

const AddContractor = () => {
    const [contractorid, setcontractorid] = useState('');
    const [company, setcompany] = useState('');
    const [registrationid, setregistrationid] = useState('');
    const [registrtiondate, setregistrtiondate] = useState('');
    const [tinnumber, settinnumber] = useState('');
    const [contactnumber, setcontactnumber] = useState('');
    const [workforcesize, setworkforcesize] = useState('');
    const [paymentofwaste, setpaymentofwaste] = useState('');
    const [requiredamount, setrequiredamount] = useState('');
    const [contractduration, setcontractduration] = useState('');
    const [areaofcollection, setareaofcollection] = useState('');
    const [designatedsts, setdesignatedsts] = useState('');


    const handleVehicleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addcontractor', {
                contractorid,
                company,
                registrationid,
                registrtiondate,
                tinnumber,
                contactnumber,
                workforcesize,
                paymentofwaste,
                requiredamount,
                contractduration,
                areaofcollection,
                designatedsts
            });

            if (response.data.status === 'ok') {
                alert('Contractor Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleVehicleSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Add Contractor</h3>

                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Registration Name
                                </label> */}
                                <input
                                    type="text"
                                    placeholder="Contractor ID"
                                    onChange={(e) => setcontractorid(e.target.value)}
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
                                    placeholder="Name of Company"
                                    onChange={(e) => setcompany(e.target.value)}
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

                                    placeholder="Registration ID"
                                    onChange={(e) => setregistrationid(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Coast Loaded
                                </label> */}
                                <input
                                    type="date"
                                    placeholder="Registration Date"

                                    onChange={(e) => setregistrtiondate(e.target.value)}
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
                                    placeholder="TIN Number of Company"
                                    onChange={(e) => settinnumber(e.target.value)}
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
                                    placeholder="Contact Number"
                                    onChange={(e) => setcontactnumber(e.target.value)}
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
                                    placeholder="Workforce Size"
                                    onChange={(e) => setworkforcesize(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Coast Unloaded
                                </label> */}
                                <input
                                    type="number"
                                    placeholder="Payment per tonnageof waste"
                                    onChange={(e) => setpaymentofwaste(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vehicle Coast Unloaded
                                </label> */}
                                <input
                                    type="number"
                                    placeholder="Required Amount of waste per day"
                                    onChange={(e) => setrequiredamount(e.target.value)}
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
                                    placeholder="Contract Duration"
                                    onChange={(e) => setcontractduration(e.target.value)}
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
                                    placeholder="Area of Collection"
                                    onChange={(e) => setareaofcollection(e.target.value)}
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
                                    placeholder="Designated STS"
                                    onChange={(e) => setdesignatedsts(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Add Contractor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AddContractor;
