import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [])

    // Handle Delete
    const handleDelete = (id) => {
        const procceed = window.confirm('are you sure want to delete?');

        if (procceed) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount) {
                        alert('Delete')
                        const remaining = users.filter(user => user._id !== id)
                        setUsers(remaining)
                    }
                })
        }

    }




    return (
        <>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Usres: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        users.map((user, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.userType}</td>
                                    <td>{user.email}</td>
                                    <td className="flex gap-2">
                                        <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>

                                        <Link to={`/dashboard/users/${user._id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded">Update User</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
            </div>
        </>

    );
};

export default AllUsers;