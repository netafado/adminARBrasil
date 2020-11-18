import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";


//i18n
import { withNamespaces } from 'react-i18next';


const NotificationDropdown = (props) => {

 // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  return (
    <>
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className="dropdown d-inline-block"
          tag="li"
        >
          <DropdownToggle
            className="btn header-item noti-icon waves-effect"
            tag="button" id="page-header-notifications-dropdown">
            <i className="bx bx-bell"></i>
            {/*<span className="badge badge-danger badge-pill">3</span> */}
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0" right>
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> {props.t('Notificações')} </h6>
                </Col>
                <div className="col-auto">
                  <a href="#!" className="small"> ver todas</a>
                </div>
              </Row>
            </div>

            <SimpleBar style={{ height: "230px" }}>


            </SimpleBar>

          </DropdownMenu>
        </Dropdown>
    </>
  );
}

export default withNamespaces()(NotificationDropdown);