import { NavLink, Outlet } from 'react-router-dom';

const ContractorManagerDashboard = () => {
    return (
        <div>
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
                    <ul className="menu p-4 w-60 flex flex-col space-y-4 min-h-full bg-slate-900 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink exact to="/contractormanagerdashboard/contractormanagerdashboardhome" className='text-white' activeClassName="bg-white text-black">Contractor M Dashboard</NavLink></li>
                        <li><NavLink exact to="/contractormanagerdashboard/createworker" className='text-white' activeClassName="bg-white text-black">Add Worker</NavLink></li>
                        <li><NavLink exact to="/contractormanagerdashboard/realtimeview" className='text-white' activeClassName="bg-white text-black">Track Worker</NavLink></li>
                        <li><NavLink exact to="/contractormanagerdashboard/logout" className='text-white' activeClassName="bg-white text-black">Log Out</NavLink></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContractorManagerDashboard;