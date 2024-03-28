import { NavLink, Outlet } from "react-router-dom";


const UserDashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to="/userdashboard/userwelcome">User Home</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/userdashboard/logout">Log Out</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/userdashboard/resetpassword">Reset Password</NavLink></li>
                </ul>

            </div>
            <div className="w-full p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UserDashboard;