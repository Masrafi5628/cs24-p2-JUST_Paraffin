import { useState } from "react";

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        fetch("http://localhost:5000/auth/reset-password/initiate", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                alert(data.status)
            });
    }

    return (
        <div className="max-w-96 mx-auto py-20">
            <h2 className="text-3xl mx-auto mb-10 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        className="input input-bordered w-full " />

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;