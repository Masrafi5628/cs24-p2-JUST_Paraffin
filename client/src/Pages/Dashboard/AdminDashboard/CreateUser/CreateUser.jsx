


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users', {
            username: username,
            email: email,
            password: password,
            userType: userType
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Create User</h3>
                            <div className="mb-4">
                                <div className="flex items-center flex-wrap gap-4">
                                    <input
                                        type="radio"
                                        id="systemAdmin"
                                        name="userType"
                                        value="System Admin"
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="systemAdmin" className="mr-4">System Admin</label>

                                    <input
                                        type="radio"
                                        id="stsManager"
                                        name="userType"
                                        value="Sts Manager"
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="stsManager" className="mr-4">STS Manager</label>

                                    <input
                                        type="radio"
                                        id="landfillManager"
                                        name="userType"
                                        value="Landfill Manager"
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="landfillManager">Landfill Manager</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </>
    );
};

export default CreateUser;
