import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
// import Register from "../Pages/Login/Register/Register";
import Login from "../Pages/Login/Login/Login";
import Dashboard from "../Layout/Dashboard";
import CreateUser from "../Pages/Dashboard/AdminDashboard/CreateUser/CreateUser";
import UserDashboard from "../Layout/UserDashboard";
import UserLogout from "../Pages/Dashboard/UserDashboard/UserLogout/UserLogout";
import UserResetPassword from "../Pages/Dashboard/UserDashboard/UserResetPassword/UserResetPassword";
import UserWelcome from "../Pages/Dashboard/UserDashboard/UserWelcome/UserWelcome";
import AdminWelcomeHome from "../Pages/Dashboard/AdminDashboard/AdminWelcomeHome/AdminWelcomeHome";
import StsDashboard from "../Layout/StsDashboard";
import StsWelcomeHome from "../Pages/Dashboard/StsDashboard/StsWelcomeHome/StsWelcomeHome";
import LandfillDashboard from "../Layout/LandfillDashboard";
import LandfillWelcomeHome from "../Pages/Dashboard/LandfillDashboard/LandfillWelcomeHome/LandfillWelcomeHome";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import AvailableRoles from "../Pages/Dashboard/AdminDashboard/AvailableRoles/AvailableRoles";
import UpdateRole from "../Pages/Dashboard/AdminDashboard/UpdateRole/UpdateRole";
import UpdateUserDetail from "../Pages/Dashboard/AdminDashboard/UpdateUserDetail/UpdateUserDetail";
import AddVehicle from "../Pages/Dashboard/AdminDashboard/AddVehicle/AddVehicle";
import AddSTS from "../Pages/Dashboard/AdminDashboard/AddSTS/AddSTS";
import RoleManagement from "../Pages/Dashboard/AdminDashboard/RoleManagement/RoleManagement";
import AddLandfillSite from "../Pages/Dashboard/AdminDashboard/AddLandfillSItes/AddLandfillSite";
import LandFillManagement from "../Pages/Dashboard/AdminDashboard/LandfillManagements/LandFillManagement/LandFillManagement";
import AssignManager from "../Pages/Dashboard/AdminDashboard/AssignManager/AssignManager";
import AddEntryTruck from "../Pages/Dashboard/LandfillDashboard/AddEntryTrack/AddEntryTruck";
import StsAddVehicle from "../Pages/Dashboard/StsDashboard/AddVehicle/StsAddVehicle";
import CreateBill from "../Pages/Dashboard/LandfillDashboard/CreateBill/CreateBill";
import ViewGenerate from "../Pages/Dashboard/LandfillDashboard/ViewGenerate/ViewGenerate";
import UpdateLandfillDetail from "../Pages/Dashboard/LandfillDashboard/UpdateLandfillDetails/UpdateLandfillDetail";
import AdminProfileUpdate from "../Pages/Dashboard/AdminDashboard/AdminProfileUpdate/AdminProfileUpdate";
import StsProfileUpdate from "../Pages/Dashboard/StsDashboard/StsProfileUpdate/StsProfileUpdate";
import UserProfileUpdate from "../Pages/Dashboard/UserDashboard/UserProfileUpdate/UserProfileUpdate";
import StsRouteView from "../Pages/Dashboard/StsDashboard/StsRouteView/StsRouteView";
import StsList from "../Pages/Dashboard/StsDashboard/StsList/StsList";
import CreateMapPage from "../Pages/Dashboard/StsDashboard/CreateMapPage/CreateMapPage";
import AdminView from "../Pages/Dashboard/AdminDashboard/AdminView/AdminView";
import AddminAllUserView from "../Pages/Dashboard/AdminDashboard/AdminAllUserView/AddminAllUserView";
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
                path: "adminview",
                element: <AdminView></AdminView>,

            },
            {
                path: "systemwelcome",
                element: <AdminWelcomeHome></AdminWelcomeHome>
            },
            {
                path: "createuser",
                element: <CreateUser></CreateUser>
            },
            {
                path: "allusers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "allroles",
                element: <AvailableRoles></AvailableRoles>
            },
            {
                path: "users/:id",
                element: <UpdateUserDetail></UpdateUserDetail>,
                loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)

            },
            {
                //http://localhost:5000/users/66059761f9bf025900cdcee6/roles
                path: "users/:id/roles",
                element: <UpdateRole></UpdateRole>,
                loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}/roles`)
            },
            {
                path: "addvehicle",
                element: <AddVehicle></AddVehicle>
            },
            {
                path: "addSTS",
                element: <AddSTS></AddSTS>
            },
            {
                path: "addlandfill",
                element: <AddLandfillSite></AddLandfillSite>
            },
            {
                path: "rolemanage",
                element: <RoleManagement></RoleManagement>
            },
            {
                path: "assignlandfillmanager",
                element: <LandFillManagement></LandFillManagement>
            },
            {
                path: "assignmanager/:id",
                element: <AssignManager></AssignManager>,
                loader: ({ params }) => fetch(`http://localhost:5000/landfills/${params.id}`)
            },
            {
                path: "profile/:id",
                element: <AdminProfileUpdate></AdminProfileUpdate>,
                loader: ({ params }) => fetch(`http://localhost:5000/profile/${params.id}`)
            },
            {
                path: "alluserstatistics",
                element: <AddminAllUserView></AddminAllUserView>
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
            },
            {
                path: "profile/:id",
                element: <UserProfileUpdate></UserProfileUpdate>,
                loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)

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
            },
            {
                path: "addvehicle",
                element: <StsAddVehicle></StsAddVehicle>
            },
            {
                path: "profile/:id",
                element: <StsProfileUpdate></StsProfileUpdate>,
                loader: ({ params }) => fetch(`http://localhost:5000/profile/${params.id}`)

            },
            {
                path: "stsinfolists",
                element: <StsList></StsList>,
                loader: () => fetch('http://localhost:5000/stsinfo')

            },
            {
                path: "stsview/:id",
                element: <StsRouteView></StsRouteView>,
                loader: ({ params }) => fetch(`http://localhost:5000/stsinfo/${params.id}`)
            },
            {
                path: "createmap",
                element: <CreateMapPage></CreateMapPage>
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
            },
            {
                path: "addtruck",
                element: <AddEntryTruck></AddEntryTruck>
            },
            {
                path: "createbill",
                element: <CreateBill></CreateBill>
            },
            {
                path: "createbillpage",
                element: <ViewGenerate></ViewGenerate>
            },
            {
                path: "profile/:id",
                element: <UpdateLandfillDetail></UpdateLandfillDetail>,
                loader: ({ params }) => fetch(`http://localhost:5000/profile/${params.id}`)
            }
        ]
    }


]);