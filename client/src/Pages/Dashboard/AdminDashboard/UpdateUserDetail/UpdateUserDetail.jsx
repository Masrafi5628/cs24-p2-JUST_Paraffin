import { useLoaderData } from "react-router-dom";

const UpdateUserDetail = () => {
    const loadedUser = useLoaderData();

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const userType = form.userType.value;
        console.log(username, email, userType);
        const updateDetail = { username, email, userType };

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateDetail),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount === 1) {
                    alert('User Details Updated Successfully');
                }
            });
    }
    return (
        <div>
            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Update User Details</h2>
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"

                            defaultValue={loadedUser.username}
                            name='username'
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            defaultValue={loadedUser.email}
                            name='email'
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            defaultValue={loadedUser.userType}
                            name='userType'
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">
                            Update User Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserDetail;