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


        <>

            {/* <div className="max-w-96 mx-auto py-20">
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
            </div> */}

            <section className="common-section bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="common-wrapper max-w-md w-full p-6">
                    <div className="card w-full max-w-md shadow-lg bg-white">
                        <form className="card-body" onSubmit={handleUpdate}>
                            <h3 className="text-2xl font-semibold text-center mb-4">Update Role</h3>

                            <div className="mb-4">

                                <input
                                    name='usertype'
                                    type="text"
                                    defaultValue={loadedUser.userType}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <button className=" bg-slate-950 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full">
                                    Update Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>


    );
};

export default UpdateRole;