import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BillGeneration = () => {
    const navigate = useNavigate();
    const [contractorid, setcontractorid] = useState("");
    const [finerate, setfinerate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOneSubmit = (e) => {
        e.preventDefault();

        // Make API call to create bill
        axios.post('http://localhost:5000/generatebill', {
            contractorid: contractorid,
            finerate: finerate
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Bill Generated Successfully');
                    setcontractorid(""); // Clear input fields after successful submission
                    navigate('/stsdashboard/billgenerateview'); // Redirect to viewgenerate page after successful submission
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An error occurred while generating the bill');
                }
            });
    }

    return (
        <>
            <h2 className="text-3xl mb-2 text-center font-semibold">Generate Bill</h2>
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleOneSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractorID">
                            Contractor ID
                        </label>
                        <input
                            value={contractorid}
                            onChange={(e) => setcontractorid(e.target.value)}
                            type="text"
                            id="contractorid"
                            placeholder="Contractor ID"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Fine Rate">
                            Fine Rate
                        </label>
                        <input
                            value={finerate}
                            onChange={(e) => setfinerate(e.target.value)}
                            type="number"
                            id="finerate"
                            placeholder="Fine Rate in percentage"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Submit and Generate Bill
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
                </form>
            </div>

        </>
    );
};

export default BillGeneration;