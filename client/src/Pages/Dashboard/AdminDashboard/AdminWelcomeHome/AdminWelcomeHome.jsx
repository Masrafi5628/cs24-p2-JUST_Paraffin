import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const AdminWelcomeHome = () => {
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
        <>
            <section className="common-section bg-gray-100 space-y-10 min-h-screen py-20 px-5">

                <div className="max-w-xl mx-auto py-20">
                    <div className="bg-white  rounded-lg shadow-lg px-8 py-6">
                        <h3 className="text-3xl mb-6 text-center font-bold">Profile Details</h3>
                        {userData && (
                            <>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Username:
                                    </label>
                                    <p className="text-lg text-gray-800">{userData.username}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Email:
                                    </label>
                                    <p className="text-lg text-gray-800">{userData.email}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Role:
                                    </label>
                                    <p className="text-lg text-gray-800">{userData.userType}</p>
                                </div>
                                <Link to={`/dashboard/profile/${userData._id}`}>
                                    <button className="bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                        Update Profile
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminWelcomeHome;