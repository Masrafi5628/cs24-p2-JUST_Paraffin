import { useState } from "react";
import { Link } from "react-router-dom";

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

        <>
            {/* <div className="max-w-96 mx-auto py-20">
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
        </div> */}

            <section className='login-section'>
                <div className="login-wrapper">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <h3 className='login-title'>Reset Password </h3>
                            <p className='is-login'>Back to Home?<a className='is-not-login'><Link to='/'>Home</Link></a></p>

                            {/* <div className='divider'>
                            <span><p>OR</p></span>
                        </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control mt-6">
                                <button className=" login-btn ">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>

    );
};

export default ResetPassword;