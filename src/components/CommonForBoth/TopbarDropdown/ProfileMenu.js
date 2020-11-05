import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//i18n
import { withNamespaces } from 'react-i18next';
// Redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logoutUser } from "../../../store/auth/login/actions"

// users
import user1 from '../../../assets/images/users/avatar-1.jpg';

const ProfileMenu = (props) => {

   // Declare a new state variable, which we'll call "menu"
   const [menu, setMenu] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector((state) => state.Login.user)

    const logOut = () =>{
        dispatch(logoutUser(props.history))
    }   
  return (
    <React.Fragment>
        <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block" >
            <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                <img className="rounded-circle header-profile-user" src={user1} alt="Header Avatar" />
                <span className="d-none d-xl-inline-block ml-2 mr-1">{ user ? ( user.attributes.email || user.attributes.name || "ARBRASIL")}</span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
            </DropdownToggle>
            <DropdownMenu right>
                {/*<DropdownItem tag="a"  href="#"> <i className="bx bx-user font-size-16 align-middle mr-1"></i>{props.t('Profile')}  </DropdownItem>
                <DropdownItem tag="a" href="auth-lock-screen"><i className="bx bx-lock-open font-size-16 align-middle mr-1"></i>{props.t('Lock screen')}</DropdownItem>
                <div className="dropdown-divider"></div>*/}
                <div onClick={logOut} className="dropdown-item">
                    <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                    <span>{props.t('Sair')}</span>
                </div>
            </DropdownMenu>
        </Dropdown>
    </React.Fragment>
  );
}

const mapStatetoProps = state => {
    const { error,success } = state.Profile;
    return { error,success };
}

export default withRouter(connect(mapStatetoProps, {  })(withNamespaces()(ProfileMenu)));

