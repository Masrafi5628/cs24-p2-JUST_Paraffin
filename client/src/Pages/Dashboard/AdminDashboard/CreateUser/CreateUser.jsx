// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateUser = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState("");

//     const naviagate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:5000/users', {
//             username: username,
//             email: email,
//             password: password,
//             userType: userType
//         })
//             .then(res => {
//                 if (res.data.status === 'ok') {
//                     alert('User Added Successfully');
//                     // naviagate('/login');
//                 }

//             })
//             .catch(err => {
//                 console.log(err);
//             })

//     }


//     return (
//         <div className="max-w-96 mx-auto py-20">
//             <h2 className="text-3xl mx-auto mb-10 text-center">Create User</h2>
//             <form action="" onSubmit={handleSubmit}>

//                 <div>

//                     <div className="flex items-center gap-4">
//                         <input
//                             type="radio"
//                             id="systemAdmin"
//                             name="userType"
//                             value="System Admin"
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="mr-2"
//                         />
//                         <label htmlFor="systemAdmin" className="mr-4">System Admin</label>

//                         <input
//                             type="radio"
//                             id="stsManager"
//                             name="userType"
//                             value="Sts Manager"
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="mr-2"
//                         />
//                         <label htmlFor="stsManager" className="mr-4">STS Manager</label>

//                         <input
//                             type="radio"
//                             id="landfillManager"
//                             name="userType"
//                             value="Landfill Manager"
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="mr-2"
//                         />
//                         <label htmlFor="landfillManager">Landfill Manager</label>
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-3 mt-4">
//                     <input
//                         type="text"
//                         placeholder="Username"
//                         onChange={(e) => setUsername(e.target.value)}
//                         className="input input-bordered w-full"
//                     />
//                     <input
//                         type="text"
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                         className="input input-bordered w-full"
//                     />

//                     <input
//                         type="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                         className="input input-bordered w-full"
//                     />
//                     <button type="submit" className="btn btn-primary">Add User</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateUser;


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
            {/* <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Create User</h2>
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
            </div> */}

            {/* <section className='login-section'>
                <div className="login-wrapper">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h3 className='login-title'>Create User  </h3>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"
                                    placeholder="Name"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control mt-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section> */}

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Create User</h3>
                            <div className="mb-4">
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
