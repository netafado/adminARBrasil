import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import InfoGerais from "./infoGerais/reducer";
import Products from "./product/reducer"
import ProdutosLista from "./listaProdutos/reducer"
import Clientes from "./clientes/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  InfoGerais,
  Products,
  ProdutosLista,
  Clientes
});

export default rootReducer;
