import { NavLink, Outlet } from "react-router-dom";


const LandfillDashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to="/landfilldashboard/landfillmanager">Landfill Home</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/landfilldashboard/addtruck">Add Entry Truck</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/landfilldashboard/createbill">Create Bill</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/landfilldashboard/logout">Log Out</NavLink></li>
                </ul>


            </div>
            <div className="w-full p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default LandfillDashboard;