import React, {  useEffect } from 'react';

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

const SidebarContent = (props) => {
        
    // Use ComponentDidMount and ComponentDidUpdate method symultaniously
     useEffect(() => {

        var pathName = props.location.pathname;

        const initMenu = () => {
            new MetisMenu("#side-menu");
            var matchingMenuItem = null;
            var ul = document.getElementById("side-menu");
            var items = ul.getElementsByTagName("a");
            for (var i = 0; i < items.length; ++i) {
                if (pathName === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                activateParentDropdown(matchingMenuItem);
            }
        }
         initMenu();
      }, [props.location.pathname]);

  
    function  activateParentDropdown(item) {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

          return (
           
            <React.Fragment>
                 <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">{props.t('Menu') }  </li>
                     <li>
                         <Link to="/#" className="waves-effect">
                                <i className="bx bx-home-circle"></i>
                                {/* <span className="badge badge-pill badge-info float-right">03</span>*/}
                                <span>{props.t('Dashboards') }</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/dashboard">{props.t('Central do cliente') }</Link></li>
                                </ul>
                     </li>
                     <li className="menu-title">{props.t('Usuários') }</li>
                     <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bxs-user-detail"></i>
                            <span>{props.t('Cliente') }</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="/clientes">{props.t('lista de cliente') }</Link></li>
                            <li><Link to="/clientes-adicionar">{props.t('Criar novo') }</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-user-circle"></i>
                            <span>{props.t('Técnicos') }</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="/tecnicos">{props.t('Lista de técnicos') }</Link></li>
                            <li><Link to="/adicionar-tecnico">{props.t('Criar novo') }</Link></li>
                        </ul>
                    </li>
                    <li className="menu-title">{props.t('Aplicação') }</li>
                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bxs-detail"></i>
                            <span>{props.t('Chamados')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="ecommerce-products">{props.t('Lista de chamados') }</Link></li>
                            <li><Link to="ecommerce-product-detail">{props.t('Criar novo') }</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bxs-basket"></i>
                            <span>{props.t('Produtos')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="ecommerce-products">{props.t('Lista de produtos') }</Link></li>
                            <li><Link to="/adicionar-produto">{props.t('Criar novo') }</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            </React.Fragment>
          );
        }

    export default withRouter(withNamespaces()(SidebarContent));


