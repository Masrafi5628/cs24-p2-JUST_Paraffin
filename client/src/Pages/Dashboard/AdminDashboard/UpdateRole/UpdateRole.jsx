import { useLoaderData } from "react-router-dom";

const UpdateRole = () => {
    const loadedUser = useLoaderData();

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = event.target;
        const role = form.usertype.value;
        console.log(role);
        const updateRole = { role };

        fetch(`http://localhost:5000/users/${loadedUser._id}/roles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateRole),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount === 1) {
                    alert('Role Updated Successfully');
                }
            });
    }

    return (
        <div>

            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Update Role</h2>
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-3">
                        <input
                            name='usertype'
                            type="text"
                            defaultValue={loadedUser.userType}
                            className="input input-bordered w-full"
                        />

                        <button type="submit" className="btn btn-primary">
                            Update Role
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateRole;