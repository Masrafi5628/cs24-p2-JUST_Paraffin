import { useEffect, useState } from "react";

const ContractorManagerHome = () => {

    const [userId, setUserId] = useState(''); // State to store the user ID
    const [user, setUser] = useState(null); // State to store the user data

    useEffect(() => {
        // Fetch user data when the component mounts
        if (userId) {
            fetch(`http://localhost:5000/constructormanager/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Set the user data in state
                    setUser(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    // Handle errors here
                });
        }
    }, [userId]);

    // Function to handle changes in the input field
    const handleInputChange = event => {
        setUserId(event.target.value);
    };


    return (
        <div>
            <label htmlFor="userId">User ID:</label>
            <input
                type="text"
                id="userId"
                value={userId}
                onChange={handleInputChange}
            />

            {/* Display user data */}
            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>User ID: {user._id}</p>
                    {/* Display other user details here */}
                </div>
            )}
        </div>
    );
};

export default ContractorManagerHome;