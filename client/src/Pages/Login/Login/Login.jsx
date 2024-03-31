import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                        alert("Login successful");
                        window.localStorage.setItem("token", data.data);
                        navigate('/dashboard/systemwelcome');
                        break;
                    case 'sts manager':
                        alert("Login successful");
                        window.localStorage.setItem("token", data.data);
                        navigate('/stsdashboard/stsmanager');
                        break;
                    case 'landfill manager':
                        alert("Login successful");
                        window.localStorage.setItem("token", data.data);
                        navigate('/landfilldashboard/landfillmanager');
                        break;
                    default:
                        alert("Login successful");
                        window.localStorage.setItem("token", data.data);
                        navigate('/userdashboard/userwelcome');
                        break;
                }
            } else {
                // Handle login error
                console.error(data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again!');
        }
    };

    return (
        <div className="max-w-md mx-auto py-20">
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

        </div>
    );
};

export default Login;
