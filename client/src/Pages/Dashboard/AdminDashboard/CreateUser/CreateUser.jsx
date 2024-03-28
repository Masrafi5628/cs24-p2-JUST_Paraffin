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
            <form action="" onSubmit={handleSubmit} >

                <div>
                    Create As <br />
                    <input
                        type="radio"
                        name="UserType"
                        value="System Admin"
                        onChange={(e) => setUserType(e.target.value)}
                    />
                    System Admin
                    <input
                        type="radio"
                        name="UserType"
                        value="Sts Manager"
                        onChange={(e) => setUserType(e.target.value)}
                    />
                    Sts Manager
                    <input
                        type="radio"
                        name="UserType"
                        value="Landfill Manager"
                        onChange={(e) => setUserType(e.target.value)}
                    />
                    Landfil Manager
                </div>

                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-bordered w-full " />
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input input-bordered w-full " />

                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full " />
                    <button className="btn btn-primary">Add User</button>
                    {/* <p>Already have an account? <Link to='/login'>Login</Link></p> */}
                </div>
            </form>
        </div>
    );
};

export default CreateUser;