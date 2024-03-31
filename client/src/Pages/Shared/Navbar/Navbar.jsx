import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to='/'><li><a>Home</a></li></Link>
                    </ul>
                </div>

                <Link to='/'>
                    <a className="btn btn-ghost text-xl">EcoSync</a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link to='/'><li><a>Home</a></li></Link>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <Link to="/login">  <a className="btn bg-blue-600 text-white hover:bg-sky-600"> Login</a></Link>
                {/* <Link to="/dashboard/systemwelcome">  <a className="btn">Dashboard</a></Link>
                <Link to="/userdashboard/userwelcome">  <a className="btn">User Dashboard</a></Link> */}


            </div>
        </div>
    );
};

export default Navbar;