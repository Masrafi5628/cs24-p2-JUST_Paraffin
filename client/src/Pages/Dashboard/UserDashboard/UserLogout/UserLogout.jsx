import { useEffect, useState } from "react";

const UserLogout = () => {
    const [userData, setUserData] = useState("");
    // const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/userData", {
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
                    window.location.href = "/";
                }
            });
    }, []);

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    }


    return (
        <div>
            <p>Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <button type="submit" onClick={logout} className="btn btn-primary">Log Out</button>
        </div>
    );
};

export default UserLogout;