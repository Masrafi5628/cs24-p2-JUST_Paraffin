import axios from "axios";
import { useState } from "react";

const AddWorker = () => {
    const [employeeID, setEmployeeID] = useState('');
    const [constructorID, setConstructorID] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [dateOfHire, setDateOfHire] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [paymentPerHour, setPaymentPerHour] = useState('');
    const [contactInformation, setContactInformation] = useState('');
    const [assignedCollectionRoute, setAssignedCollectionRoute] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleWorkerSubmit = async (e) => {
        e.preventDefault();
        console.log(employeeID, constructorID, fullName, email, dateOfBirth, dateOfHire, jobTitle, paymentPerHour, contactInformation, assignedCollectionRoute, username, password);

        try {
            const response = await axios.post('http://localhost:5000/createworker', {
                employeeID: employeeID,
                constructorID: constructorID,
                fullName: fullName,
                email: email,
                dateOfBirth: dateOfBirth,
                dateOfHire: dateOfHire,
                jobTitle: jobTitle,
                paymentPerHour: paymentPerHour,
                contactInformation: contactInformation,
                assignedCollectionRoute: assignedCollectionRoute,
                username: username,
                password: password
            });

            if (response.data.status === 'ok') {
                alert('Create Worker Added Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <>
            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleWorkerSubmit}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Add Worker</h3>

                            {/* <p className="text-lg text-gray-800">{userData.userId}</p> */}


                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Employee ID"
                                    onChangeCapture={(e) => setEmployeeID(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Constructor ID"
                                    onChangeCapture={(e) => setConstructorID(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>


                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Date of Birth</label>
                                <input
                                    type="date"
                                    placeholder="Date of Birth"
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">Date of Hire</label>
                                <input
                                    type="date"
                                    placeholder="Date of Hire"
                                    onChange={(e) => setDateOfHire(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Payment per Hour"
                                    onChange={(e) => setPaymentPerHour(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Contact Information"
                                    onChange={(e) => setContactInformation(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">

                                <input
                                    type="text"
                                    placeholder="Assigned Collection Route"
                                    onChange={(e) => setAssignedCollectionRoute(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered w-full"

                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Add Worker
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AddWorker;
