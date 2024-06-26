import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    return (

        <>


            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 flex flex-col	space-y-4 min-h-full bg-slate-900 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink exact to="/dashboard/adminview" className='text-white' activeClassName="bg-white text-black">Statistic Dashboard</NavLink></li>
                        <li><NavLink exact to="/dashboard/systemwelcome" className='text-white' activeClassName="bg-white text-black">Admin Home</NavLink></li>
                        <li><NavLink exact to="/dashboard/createuser" className='text-white' activeClassName="bg-white text-black">Create User</NavLink></li>
                        <li><NavLink exact to="/dashboard/allusers" className='text-white' activeClassName="bg-white text-black">All Users</NavLink></li>
                        {/* <li><NavLink exact to="/dashboard/allroles" className='text-white' activeClassName="bg-white text-black">Available All Roles</NavLink></li> */}
                        <li><NavLink exact to="/dashboard/addvehicle" className='text-white' activeClassName="bg-white text-black">Add Vehicle</NavLink></li>
                        <li><NavLink exact to="/dashboard/addSTS" className='text-white' activeClassName="bg-white text-black">Add STS</NavLink></li>
                        <li><NavLink exact to="/dashboard/addlandfill" className='text-white' activeClassName="bg-white text-black">Add Landfill Sites</NavLink></li>
                        <li><NavLink exact to="/dashboard/addcontractor" className='text-white' activeClassName="bg-white text-black">Add Contractor</NavLink></li>
                        <li><NavLink exact to="/dashboard/addcontractmanager" className='text-white' activeClassName="bg-white text-black">Add Contract Manager</NavLink></li>
                        <li><NavLink exact to="/dashboard/logout" className='text-white' activeClassName="bg-white text-black">Log Out</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;