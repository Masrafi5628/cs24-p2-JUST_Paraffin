import axios from 'axios';
import { useState } from "react";

const AddContractManager = () => {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [number, setNumber] = useState('');
    const [company, setCompany] = useState('');
    const [access, setAccess] = useState('');
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');

    const handleLandfillSubmit = async (e) => {
        e.preventDefault();
        console.log(name, userId, email, date, number, company, access, username, password);

        try {
            const response = await axios.post('http://localhost:5000/contractmanager', {
                name,
                userId,
                email,
                date,
                number,
                company,
                access,
                username,
                password
            });

            if (response.data.status === 'ok') {
                alert('Contract Manager  Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleLandfillSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Add Contract Manager</h3>

                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="User Id"
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="date"
                                    placeholder="Date of Account Creation"
                                    onChange={(e) => setDate(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Contact Number"
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Assign Contractor Company"
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Access Level"
                                    onChange={(e) => setAccess(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setpassword(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Add Contract Manager
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddContractManager;