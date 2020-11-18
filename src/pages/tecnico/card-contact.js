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
                                !user.foto ?
                                    <div className="avatar-sm mx-auto mb-4">
                                        <span className={"avatar-title rounded-circle bg-soft-" + user.color + " text-" + user.color + " font-size-16"}>
                                            {user.nome.charAt(0)}
                                        </span>
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <img className="rounded-circle avatar-sm" src={user.foto ? user.foto.url : null} alt="" />
                                    </div>
                            }
                            <h5 className="font-size-15"><Link to="#" className="text-dark">{user.nome} </Link></h5>
                            <p className="text-muted m-0">{user.cidade || "---"} | {user.uf}</p>
                            <p className="text-muted">CPF: {user.cpf || "---"}</p>

                            <i className="bx bx-phone"></i>{user.telefone}

                            <div className="position-absolute" style={{top: 10, right: 10}}>
                            <UncontrolledDropdown >
                                <DropdownToggle href="#" className="card-drop" tag="i">
                                    <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => props.editarTecnico(user)}><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                    <DropdownItem onClick={()=> props.deletarTecnico(user.pk)}><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            </div>
                        </CardBody>
                        <CardFooter className="bg-transparent border-top">
                            <div className="contact-links d-flex font-size-20">
                                <div className="flex-fill">
                                    <div id={"chamado" + user.id} onClick={props.abrirModal}>
                                        <i className="bx bx-message-square-dots"></i>
                                        <UncontrolledTooltip placement="top" target={"chamado" + user.id}>
                                            Chamados
                                        </UncontrolledTooltip>
                                    </div>
                                </div>
                                <div className="flex-fill">
                                    <div id={"message" + user.id} onClick={() => props.toggleModalProfile(user)}>
                                        <i className="bx bx-user"></i>
                                        <UncontrolledTooltip placement="top" target={"message" + user.id}>
                                            Profile
                                        </UncontrolledTooltip>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </React.Fragment>
          );
    }

export default CardContact;