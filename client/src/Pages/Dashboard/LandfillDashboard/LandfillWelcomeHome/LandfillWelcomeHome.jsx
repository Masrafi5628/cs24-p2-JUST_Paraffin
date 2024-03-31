import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandfillWelcomeHome = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = window.localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (data.status === "ok") {
                    setUserData(data.data);
                } else {
                    console.error("Error fetching user data:", data.error);
                    // Handle token expiration or other errors here
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-3xl mb-6 text-center font-bold"> Profile Details</h2>
            <div className="bg-white shadow-md rounded-lg px-8 py-6">
                {userData && (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700">
                                Username
                            </label>
                            <p className="text-lg text-gray-800">{userData.username}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <p className="text-lg text-gray-800">{userData.email}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700">
                                Role
                            </label>
                            <p className="text-lg text-gray-800">{userData.userType}</p>
                        </div>
                        <Link to={`/landfilldashboard/profile/${userData._id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                Update
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default LandfillWelcomeHome;
