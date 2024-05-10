import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";


const StsDashboard = () => {


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
                        <li><NavLink to="/stsdashboard/stsmanager" className='text-white' activeClassName="bg-white text-black">Sts Home</NavLink></li>
                        <li><NavLink to="/stsdashboard/addvehicle" className='text-white' activeClassName="bg-white text-black">Add Vehicle</NavLink></li>                        <li><NavLink exact to="/dashboard/createuser" className='text-white' activeClassName="bg-white text-black">Create User</NavLink></li>
                        <li><NavLink to="/stsdashboard/stsinfolists" className='text-white' activeClassName="bg-white text-black">View Route</NavLink></li>
                        <li><NavLink to="/stsdashboard/fleettruck" className='text-white' activeClassName="bg-white text-black">Fleet Generation</NavLink></li>
                        <li><NavLink to="/stsdashboard/generatebill" className='text-white' activeClassName="bg-white text-black">Generate Bill</NavLink></li>
                        <li><NavLink to="/stsdashboard/wasteinformation" className='text-white' activeClassName="bg-white text-black">Waste Information</NavLink></li>
                        <li><NavLink exact to="/stsdashboard/logout" className='text-white' activeClassName="bg-white text-black">Log Out</NavLink></li>

                    </ul>
                </div>
            </div>

        </>
    );
};

export default StsDashboard;