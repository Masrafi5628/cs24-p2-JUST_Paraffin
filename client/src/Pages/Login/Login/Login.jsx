// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();
//             console.log(data.userType);
//             if (response.ok) {
//                 // Redirect based on userType (case-insensitive)
//                 const userType = data.userType.toLowerCase();
//                 switch (userType) {
//                     case 'system admin':
//                         alert("Login successful");
//                         window.localStorage.setItem("token", data.data);
//                         navigate('/dashboard/systemwelcome');
//                         break;
//                     case 'sts manager':
//                         alert("Login successful");
//                         window.localStorage.setItem("token", data.data);
//                         navigate('/stsdashboard/stsmanager');
//                         break;
//                     case 'landfill manager':
//                         alert("Login successful");
//                         window.localStorage.setItem("token", data.data);
//                         navigate('/landfilldashboard/landfillmanager');
//                         break;
//                     default:
//                         alert("Login successful");
//                         window.localStorage.setItem("token", data.data);
//                         navigate('/userdashboard/userwelcome');
//                         break;
//                 }
//             } else {
//                 // Handle login error
//                 console.error(data.error);
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Login failed. Please try again!');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto py-20">
//             <h2 className="text-3xl mb-6 text-center font-bold">Login Page</h2>
//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                         className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         id="password"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                         className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button type="submit" className="btn btn-primary">
//                         Sign In
//                     </button>
//                     <Link to='/resetpassword'>
//                         <p className="text-blue-400">Forgot Your Password?</p>
//                     </Link>

//                 </div>

//             </form>

//         </div>
//     );
// };

// export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data.userType);
            if (response.ok) {
                // Redirect based on userType (case-insensitive)
                const userType = data.userType.toLowerCase();
                switch (userType) {
                    case 'system admin':
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/dashboard/systemwelcome');
                        break;
                    case 'sts manager':
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/stsdashboard/stsmanager');
                        break;
                    case 'landfill manager':
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/landfilldashboard/landfillmanager');
                        break;
                    default:
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/userdashboard/userwelcome');
                        break;
                }
            } else {
                // Handle login error with SweetAlert
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login failed",
                    text: data.error || "An unknown error occurred",
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error within catch block using SweetAlert
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login failed",
                text: "An error occurred while logging in. Please try again later.",
                showConfirmButton: true
            });
        }
    };

    return (
        <>
            {/* <div className="max-w-md mx-auto py-20">
                <h2 className="text-3xl mb-6 text-center font-bold">Login Page</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="input input-bordered w-full px-3 py-2 text-sm leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="btn btn-primary">
                            Sign In
                        </button>
                        <Link to='/resetpassword'>
                            <p className="text-blue-400">Forgot Your Password?</p>
                        </Link>

                    </div>

                </form>

            </div> */}

            <section className='login-section'>
                <div className="login-wrapper">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h3 className='login-title'>Sign in to EcoSync  </h3>
                            {/* <p className='is-login'>Don’t have an account?<a href="#" className='is-not-login'><Link to='/register'>Get started</Link></a></p> */}

                            {/* <div className='divider'>
                                <span><p>OR</p></span>
                            </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required />
                                <Link to="/resetpassword">
                                    <label className="label flex justify-end">
                                        <a className="label-text-alt link link-hover is-not-login">Forgot password?</a>
                                    </label>
                                </Link>

                            </div>
                            <div className="form-control mt-6">
                                <button className=" login-btn  hover:bg-blue-700">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
