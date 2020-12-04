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
import EditarCliente from "../pages/clientes/aditeCliente";
import Cliente from "../pages/clientes/cliente";
import LinkCadastro from "../pages/linkCadastro"
import AddProduto from "../pages/produtos/produto";
import EditarProduto from "../pages/produtos/editProduto";
import Produtos from "../pages/produtos"

import Tecnicos from "../pages/tecnico";
import EditarTecnico from "../pages/tecnico/editeTecnico";

import AddTecnico from "../pages/tecnico/addTecnico"

const userRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/clientes", component: Clientes, exact: true },
	{ path: "/cliente", component: Cliente },
	{ path: "/clientes-adicionar", component: ClientesAdd },
	{ path: "/clientes-editar", component: EditarCliente },
	{ path: "/adicionar-produto", component: AddProduto },
	{ path: "/editar-produto", component: EditarProduto },
	{ path: "/produtos", component: Produtos },
	{ path: "/tecnicos", component: Tecnicos },
	{ path: "/tecnico-editar", component: EditarTecnico },
	{ path: "/adicionar-tecnico", component: AddTecnico },

	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const authRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/linkCadastro/:id", component: LinkCadastro },
	{ path: "/alter-password", component: AlterPassword },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },


];

export { userRoutes, authRoutes };
