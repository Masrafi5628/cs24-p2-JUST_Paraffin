import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
// import Register from "../Pages/Login/Register/Register";
import Login from "../Pages/Login/Login/Login";
import Dashboard from "../Layout/Dashboard";
import CreateUser from "../Pages/Dashboard/AdminDashboard/CreateUser/CreateUser";
import DeleteUser from "../Pages/Dashboard/AdminDashboard/DeleteUser/DeleteUser";
import UserDashboard from "../Layout/UserDashboard";
import UserLogout from "../Pages/Dashboard/UserDashboard/UserLogout/UserLogout";
import UserResetPassword from "../Pages/Dashboard/UserDashboard/UserResetPassword/UserResetPassword";
import UserWelcome from "../Pages/Dashboard/UserDashboard/UserWelcome/UserWelcome";
import AdminWelcomeHome from "../Pages/Dashboard/AdminDashboard/AdminWelcomeHome/AdminWelcomeHome";
import StsDashboard from "../Layout/StsDashboard";
import StsWelcomeHome from "../Pages/Dashboard/StsDashboard/StsWelcomeHome/StsWelcomeHome";
import LandfillDashboard from "../Layout/LandfillDashboard";
import LandfillWelcomeHome from "../Pages/Dashboard/LandfillDashboard/LandfillWelcomeHome/LandfillWelcomeHome";
// const isLoggedIn = window.localStorage.getItem("loggedIn");
export const router = createBrowserRouter([

    {
        path: "/",
        element: <Main></Main>,

        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },


        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "systemwelcome",
                element: <AdminWelcomeHome></AdminWelcomeHome>
            },
            {
                path: "createuser",
                element: <CreateUser></CreateUser>
            },
            {
                path: "deleteuser",
                element: <DeleteUser></DeleteUser>
            }
        ]
    },
    {
        path: "userdashboard",
        element: <UserDashboard></UserDashboard>,
        children: [
            {
                path: "userwelcome",
                element: <UserWelcome></UserWelcome>
            },
            {
                path: "logout",

                element: <UserLogout></UserLogout>
            },
            {
                path: "resetpassword",
                element: <UserResetPassword></UserResetPassword>
            }
        ]
    },
    {
        path: "stsdashboard",
        element: <StsDashboard></StsDashboard>,

        children: [
            {
                path: "stsmanager",
                element: <StsWelcomeHome></StsWelcomeHome>
            }
        ]
    },
    {
        path: "landfilldashboard",
        element: <LandfillDashboard></LandfillDashboard>,

        children: [
            {
                path: "landfillmanager",
                element: <LandfillWelcomeHome></LandfillWelcomeHome>
            }
        ]
    }


]);