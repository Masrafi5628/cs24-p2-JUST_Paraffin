import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UserProfileUpdate = () => {
    const loadedUser = useLoaderData();
    const [username, setUsername] = useState(loadedUser.username);
    const [email, setEmail] = useState(loadedUser.email);
    const [usertype, setUsertype] = useState(useLoaderData.userType)

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const usertype = form.userType.value;

        console.log(username, email);

        fetch(`http://localhost:5000/profile/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, usertype })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Profile updated successfully');
                }
            })
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Update  Profile</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        name='username'
                        defaultValue={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=" Username"
                        className="input input-bordered w-full"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name='email'
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                        Role
                    </label>
                    <input
                        id="role"
                        type="text"
                        name='userType'
                        defaultValue={loadedUser.userType}
                        onChange={(e) => setUsertype(e.target.value)}
                        className="input input-bordered w-full"
                        disabled
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserProfileUpdate;