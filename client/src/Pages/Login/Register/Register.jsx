
import { Link } from "react-router-dom";

const Register = () => {


    return (
        <div className="max-w-96 mx-auto py-20">
            <h2 className="text-3xl mx-auto mb-10 text-center">Register Page</h2>
            <form action="" >
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"

                        className="input input-bordered w-full " />
                    <input
                        type="text"

                        placeholder="Email"
                        className="input input-bordered w-full " />
                    <input
                        type="password"

                        placeholder="Password"
                        className="input input-bordered w-full " />
                    <button className="btn btn-primary">Sign Up</button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </form>
        </div>

    );
};

export default Register;
