import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableRoles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users/roles')
            .then(res => res.json())
            .then(data => {
                setRoles(data)
            })
    }, [])
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Usres: {roles.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        roles.map((user, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.userType}</td>
                                    <td className="flex gap-2">

                                        <Link to={`/dashboard/users/${user._id}/roles`}>
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded">Update Roles</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
            </div>
        </div>
    );
};

export default AvailableRoles;