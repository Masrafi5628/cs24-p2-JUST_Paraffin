import { NavLink, Outlet } from "react-router-dom";


const StsDashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 h-screen bg-orange-400">
                <ul className="menu">
                    <li><NavLink to="/stsdashboard/stsmanager">Sts Home</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/stsdashboard/addvehicle">Add Vehicle</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/stsdashboard/stsinfolists">View Route</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/stsdashboard/fleettruck">Fleet Generation</NavLink></li>
                </ul>
                <ul className="menu">
                    <li><NavLink to="/stsdashboard/logout">Log Out</NavLink></li>
                </ul>


            </div>
            <div className="w-full p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default StsDashboard;