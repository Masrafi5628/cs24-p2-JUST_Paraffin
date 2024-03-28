import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                        navigate('/dashboard/systemwelcome');
                        break;
                    case 'sts manager':
                        navigate('/stsdashboard/stsmanager');
                        break;
                    case 'landfill manager':
                        navigate('/landfilldashboard/landfillmanager');
                        break;
                    default:
                        break;
                }
            } else {
                // Handle login error
                console.error(data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="max-w-96 mx-auto py-20">
            <h2 className="text-3xl mx-auto mb-10 text-center">Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         console.log(userType.toLowerCase());


//         e.preventDefault();

//         fetch("http://localhost:5000/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//                 userType
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.status === "ok") {
//                     alert("Login successful");
//                     window.localStorage.setItem("token", data.data);
//                     window.localStorage.setItem("loggedIn", true);
//                     navigate("/userdashboard/userwelcome");
//                 } else {
//                     // Login failed, show alert
//                     alert("Incorrect email or password. Please try again.");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//                 // Handle other errors, such as network issues
//                 alert("An error occurred. Please try again later.");
//             });
//     };

//     return (
//         <div className="max-w-96 mx-auto py-20">
//             <h2 className="text-3xl mx-auto mb-10 text-center">Login Page</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* <div>
//                     Create As <br />
//                     <input
//                         type="radio"
//                         name="UserType"
//                         value="System Admin"
//                         onChange={(e) => setUserType(e.target.value)}
//                     />
//                     System Admin
//                     <input
//                         type="radio"
//                         name="UserType"
//                         value="Sts Manager"
//                         onChange={(e) => setUserType(e.target.value)}
//                     />
//                     Sts Manager
//                     <input
//                         type="radio"
//                         name="UserType"
//                         value="Landfil Manager"
//                         onChange={(e) => setUserType(e.target.value)}
//                     />
//                     Landfil Manager
//                 </div> */}
//                 <div className="flex flex-col gap-3">
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email"
//                         className="input input-bordered w-full"
//                     />
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                         className="input input-bordered w-full"
//                     />
//                     <button type="submit" className="btn btn-primary">
//                         Sign In
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;
