import axios from 'axios';
import React, { useState } from 'react';

const WasteInformation = () => {
    const [contractorId, setcontractorId] = useState('');
    const [timeanddate, settimeanddate] = useState('');
    const [amountofwaste, setamountofwaste] = useState('');
    const [typeofwaste, settypeofwaste] = useState('');
    const [designatedSTS, setdesignatedSTS] = useState('');
    const [vehiclesusedfortransformation, setvehiclesusedfortransformation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOneSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/wasteinfo', {
            contractorId: contractorId,
            timeanddate: timeanddate,
            amountofwaste: amountofwaste,
            typeofwaste: typeofwaste,
            designatedSTS: designatedSTS,
            vehiclesusedfortransformation: vehiclesusedfortransformation
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Waste Information Added Successfully');
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An error occurred while adding the waste information');
                }
            });
    }

    return (
        <div>
            <div className="max-w-96 mx-auto py-20 bg-white shadow-md rounded-lg px-8 py-6">
                <h2 className="text-3xl mx-auto mb-10 text-center">Add Waste Information</h2>
                <form onSubmit={handleOneSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Contarctor ID"
                            value={contractorId}
                            onChange={(e) => setcontractorId(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="date"
                            placeholder="Time and Date"
                            value={timeanddate}
                            onChange={(e) => settimeanddate(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            placeholder="amount of waste in kg"
                            value={amountofwaste}
                            onChange={(e) => setamountofwaste(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="type of waste"
                            value={typeofwaste}
                            onChange={(e) => settypeofwaste(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="designatedSTS"
                            value={designatedSTS}
                            onChange={(e) => setdesignatedSTS(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="vehicle used for transformation"
                            value={vehiclesusedfortransformation}
                            onChange={(e) => setvehiclesusedfortransformation(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">
                            Add Waste Information
                        </button>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WasteInformation;