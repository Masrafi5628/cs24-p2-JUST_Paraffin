import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LLogOut = () => {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/profile", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setUserData(data.data);
                if (data.data === "token expired") {
                    alert("Session Expired");
                    window.localStorage.clear();
                    navigate('/');
                }
            });
    }, []);

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    }
    return (
        <div className="container mx-auto my-8 px-4">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2">User Information</h2>
                    <p className="text-gray-600">Name: {userData.username}</p>
                    <p className="text-gray-600">Email: {userData.email}</p>
                </div>
                <div className="p-4">
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default LLogOut;