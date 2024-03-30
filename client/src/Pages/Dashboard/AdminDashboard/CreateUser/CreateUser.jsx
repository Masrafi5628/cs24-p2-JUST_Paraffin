import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState("");

    const naviagate = useNavigate();

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
                    alert('User Added Successfully');
                    naviagate('/login');
                }

            })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <div className="max-w-96 mx-auto py-20">
            <h2 className="text-3xl mx-auto mb-10 text-center">Register Page</h2>
            <form action="" onSubmit={handleSubmit}>

                <div>

                    <div className="flex items-center gap-4">
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

                <div className="flex flex-col gap-3 mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input input-bordered w-full"
                    />

                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary">Add User</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;