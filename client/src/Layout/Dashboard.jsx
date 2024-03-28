import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to="/dashboard/systemwelcome">Admin Home</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/dashboard/createuser">Create User</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/dashboard/allusers">All Users</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/dashboard/allroles">Available All Roles</NavLink></li>
                </ul>
            </div>
            <div className="w-full p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;