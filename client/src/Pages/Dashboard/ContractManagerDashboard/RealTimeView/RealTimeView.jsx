
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RealTimeView = () => {
    const [workerid, setworkerid] = useState('');
    const navigate = useNavigate();
    const handleOneSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/realtimeview', {
            workerid: workerid,
        })
            .then(res => {
                if (res.data.status === 'ok') {
                    alert('Open Map Successfully');
                    navigate('/contractormanagerdashboard/createmapview');
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    // setErrorMessage(err.response.data.message);
                } else {
                    // setErrorMessage('An error occurred while adding the vehicle');
                }
            });
    }

    return (
        <div>
            <div className="max-w-96 mx-auto py-20 bg-white shadow-md rounded-lg px-8 py-6">
                {/* <h2 className="text-3xl mx-auto mb-10 text-center">Add Vehicle</h2> */}
                <form onSubmit={handleOneSubmit}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Worker ID"
                            value={workerid}
                            onChange={(e) => setworkerid(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {/* button */}
                        <button type="submit" className="btn btn-primary">
                            View Map
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RealTimeView;