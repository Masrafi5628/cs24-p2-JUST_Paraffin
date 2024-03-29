import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const AssignManager = () => {
    const loadedData = useLoaderData();
    console.log(loadedData._id);
    const [managerIds, setManagerIds] = useState('');

    const handleAssignManager = async (e) => {
        e.preventDefault();


    };

    return (
        <div>
            <h2>Assign Managers to Landfill {loadedData.name}</h2>
            <form onSubmit={handleAssignManager}>
                <div>
                    <label htmlFor="managerIds">Manager IDs (comma-separated):</label>
                    <input
                        type="text"
                        id="managerIds"
                        name="managerIds"
                        value={managerIds}
                        onChange={(e) => setManagerIds(e.target.value)}
                    />
                </div>

                <button type="submit">Assign Managers</button>
            </form>
        </div>
    );
};

export default AssignManager;
