import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import AlterPassword from "../pages/Authentication/alterPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

const userRoutes = [

	{ path: "/dashboard", component: Dashboard },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const authRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/alter-password", component: AlterPassword },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },

];

export { userRoutes, authRoutes };
