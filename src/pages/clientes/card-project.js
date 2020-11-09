import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, UncontrolledTooltip, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";


const CardProject = (props) => {

    return (
               <React.Fragment>
                {
                    props.projects.map((project, key) =>
                        <Col xl="4" sm="6" key={"_project_" + key} >
                            
                            <Card>

                                    <CardBody>
                                        <Media>
                                            <div className="avatar-md mr-4">
                                                <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                    <img src={project.img} alt="" height="30" />
                                                </span>
                                            </div>

                                            <Media className="overflow-hidden" body>
                                                <h5 className="text-truncate font-size-15"><Link to="#" className="text-dark">{project.name}</Link></h5>
                                                <p className="text-muted mb-1">CNPJ: 200.222.01/111</p>
                                                <p className="text-muted mb-1">tel: (22) 988 3455</p>
                                                <p className="text-muted mb-1">contrato 
                                                {
                                                    project.contrato ?
                                                    <> <Badge color="success" className="mr-1">vigente</Badge> até: 22/02/2020</>
                                                    :
                                                    <> <Badge color="danger" className="mr-1">Sem contrato</Badge> ---</>
                                                } 
                                                
                                                </p>
                                            </Media>
                                        </Media>
                                    </CardBody>

                                <div className="px-4 py-3 border-top">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item mr-3" id="comments">
                                            <i className="bx bxs-detail mr-1"></i> {project.comments}
                                            <UncontrolledTooltip placement="top" target="comments">
                                               Chamados
                                            </UncontrolledTooltip>
                                        </li>
                                        <li className="list-inline-item mr-3" id="comments">
                                            <i className="bx bxs-detail mr-1"></i> {project.comments}
                                            <UncontrolledTooltip placement="top" target="comments">
                                               Usurios
                                            </UncontrolledTooltip>
                                        </li>
                                        <li className="list-inline-item mr-3 float-right">
                                            <UncontrolledDropdown >
                                                <DropdownToggle href="#" className="card-drop" tag="i">
                                                    <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem tag={Link} to="/clientes-adicionar"><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                    <DropdownItem href="#"><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>

                                    </ul>
                                </div>
                            </Card>
                            

                        </Col>
                    )
                }

            </React.Fragment>
          );
    }
        
export default CardProject;