import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, CardFooter, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const CardContact = (props) => {

    const user = props.user;

    return (
            <React.Fragment>
                <Col xl="3" sm="6">
                    <Card className="text-center">
                        <CardBody>
                            {
                                user.img === "Null" ?
                                    <div className="avatar-sm mx-auto mb-4">
                                        <span className={"avatar-title rounded-circle bg-soft-" + user.color + " text-" + user.color + " font-size-16"}>
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <img className="rounded-circle avatar-sm" src={user.img} alt="" />
                                    </div>
                            }

                            <h5 className="font-size-15"><Link to="#" className="text-dark">{user.name}</Link></h5>
                            <p className="text-muted">{user.designation}</p>
                            <div className="position-absolute" style={{top: 10, right: 10}}>
                            <UncontrolledDropdown right>
                                <DropdownToggle href="#" className="card-drop" tag="i">
                                    <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={Link} to="/adicionar-tecnico"><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                    <DropdownItem href="#"><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </div>
                        </CardBody>
                        <CardFooter className="bg-transparent border-top">
                            <div className="contact-links d-flex font-size-20">
                                <div className="flex-fill">
                                    <Link to="" id={"message" + user.id}>
                                        <i className="bx bx-message-square-dots"></i>
                                        <UncontrolledTooltip placement="top" target={"message" + user.id}>
                                            Telefone
                                                </UncontrolledTooltip>
                                    </Link>
                                </div>
                                <div className="flex-fill">
                                    <Link to="" id={"project" + user.id}>
                                        <i className="bx bx-pie-chart-alt"></i>
                                        <UncontrolledTooltip placement="top" target={"project" + user.id}>
                                            Chamados
                                                </UncontrolledTooltip>
                                    </Link>
                                </div>
                                <div className="flex-fill">
                                    <Link to="" id={"profile" + user.id}>
                                        <i className="bx bx-user-circle"></i>
                                        <UncontrolledTooltip placement="top" target={"profile" + user.id}>
                                            Profile
                                                </UncontrolledTooltip>
                                    </Link>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </React.Fragment>
          );
    }
        
export default CardContact;