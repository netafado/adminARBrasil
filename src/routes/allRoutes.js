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
import Clientes from "../pages/clientes";
import ClientesAdd from "../pages/clientes/addCliente";
import Cliente from "../pages/clientes/cliente";
import Tecnicos from "../pages/tecnico";
import AddProduto from "../pages/produtos/produto";

const userRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/clientes", component: Clientes, exact: true },
	{ path: "/clientes-adicionar", component: ClientesAdd },
	{ path: "/cliente", component: Cliente },
	{ path: "/tecnicos", component: Tecnicos },
	{ path: "/adicionar-produto", component: AddProduto },

	

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
