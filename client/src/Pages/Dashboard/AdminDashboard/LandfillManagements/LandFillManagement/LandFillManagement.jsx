import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandFillManagement = () => {
    const [landfills, setLandfills] = useState([]);

    useEffect(() => {
        // Fetch landfills data from the backend
        axios.get('http://localhost:5000/landfills')
            .then(res => {
                setLandfills(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="flex justify-evenly my-6">
                <h2 className="text-3xl">Landfill Management</h2>
                <h2 className="text-3xl">Total Landfill: {landfills.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Capacity</th>
                            <th>Manager</th>
                        </tr>
                    </thead>
                    {
                        landfills.map((landfill, index) => (
                            <tbody key={index}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{landfill.name}</td>
                                    <td>{landfill.capacity}</td>
                                    <td>{landfill.managers}</td>
                                    <td className="flex gap-2">

                                        <Link to={`/dashboard/assignmanager/${landfill._id}`}>
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

export default LandFillManagement;
