import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


const CardProject = ({projects, deleltarProduto, editarProduto}) => {

    return (
               <React.Fragment>
                {projects.length <= 0 ?
                    <Col><p>Nenhum produto cadastrado.</p></Col> : null
                }
                {
                    projects.map((project, key) =>
                    
                        <Col xl="4" sm="6" key={"_project_" + key} >
                            <Card>

                                    <CardBody>
                                        <Media>
                                            <div className="avatar-md mr-4">
                                                <div className="mb-3 mr-3 avatar-md">
                                                     <span className="avatar-title rounded-circle bg-light text-danger font-size-16" style={{backgroundImage: `url( ${project.imagens ? project.imagens[0].url: ""} )`}}>
                                                    </span>
                                                </div>
                                            </div>

                                            <Media className="overflow-hidden" body>
                                                <h5 className="text-truncate font-size-15 text-dark" onClick={()=>editarProduto(project)}> {project.nome}</h5>
                                                <p className="text-muted mb-1">fabricante: {project.fabricante}</p>
                                                <p className="text-muted mb-1 text-truncate">descrição: {project.descricao}</p>
                                                <div className="position-absolute" style={{top: 5, right: 10}}>
                                                    <UncontrolledDropdown >
                                                        <DropdownToggle href="#" className="card-drop" tag="i">
                                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            <DropdownItem  onClick={()=>editarProduto(project)}><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                            <DropdownItem  onClick={()=>deleltarProduto(project.pk)}><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>


                                            </Media>
                                        </Media>
                                    </CardBody>

                            </Card>
                            

                        </Col>
                    )
                }

            </React.Fragment>
          );
    }
        
export default CardProject;