
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import ResetPassword from '../Pages/Login/ResetPassword/ResetPassword';

const Main = () => {
    const location = useLocation();
    console.log(location);

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('resetpassword');
    return (
        <div>
            {!noHeaderFooter && <Navbar></Navbar>}
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
            {!noHeaderFooter && <Footer></Footer>}

        </div>
    );
};

export default Main;