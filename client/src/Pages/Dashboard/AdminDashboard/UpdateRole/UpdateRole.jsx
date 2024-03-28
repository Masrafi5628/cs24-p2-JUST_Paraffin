import { useLoaderData } from "react-router-dom";

const UpdateRole = () => {
    const loadedUser = useLoaderData();

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Update Role")
    }

    return (
        <div>

            <div className="max-w-96 mx-auto py-20">
                <h2 className="text-3xl mx-auto mb-10 text-center">Update Role</h2>
                <form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-3">
                        <input
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