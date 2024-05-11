import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ALogOut = () => {
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

        <>


            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <div className="card-body">
                            <h2 className="text-2xl font-bold mb-2">User Information</h2>
                            <p className="text-gray-600">Name: {userData.username}</p>
                            <p className="text-gray-600">Email: {userData.email}</p>

                            <div className="my-3">
                                <button onClick={logout} className=" bg-blue-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ALogOut;