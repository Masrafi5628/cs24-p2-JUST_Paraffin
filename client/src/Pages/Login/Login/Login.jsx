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
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                    case 'conmanager':
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/contractormanagerdashboard/contractormanagerdashboardhome');
                        break;
                    case 'worker':
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.localStorage.setItem("token", data.data);
                        navigate('/WorkerDashboard/workerdashboardhome');
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
                                {/* <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required /> */}

                                <div className="relative form-control">
                                    <input
                                        id="hs-toggle-password"
                                        type={showPassword ? 'text' : 'password'}
                                        // className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter password"
                                        className="input input-bordered"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-0 end-0 p-3.5 rounded-e-md"
                                    >
                                        <svg
                                            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {showPassword ? (
                                                <>
                                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </>
                                            ) : (
                                                <>
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                    <line x1="2" x2="22" y1="2" y2="22"></line>
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>


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
