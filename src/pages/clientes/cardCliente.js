import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, UncontrolledTooltip, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";


const Cardcliente = ({delete_func, clientes}) => {

    return (

            <React.Fragment>
                {clientes.length <= 0 ?
                    <Col><p>Nenhum cliente encontrado.</p></Col> : null
                }              

                {
                    clientes.map((cliente, key) =>
                        <Col xl="4" sm="6" key={"_cliente_" + key} >
                            <Card>
                                    <CardBody>
                                        <Media>
                                            <div className="avatar-md mr-4">
                                                <span className="avatar-title rounded-circle bg-light text-danger font-size-16" style={{backgroundImage: `url( ${cliente.logo? cliente.logo.url : null} )`}}>
                                                </span>
                                            </div>
                                            <Media className="overflow-hidden" body>
                                                <h5 className="text-truncate font-size-15"><Link to={`cliente/${cliente.pk}`} className="text-dark">{cliente.razaoSocial}</Link></h5>
                                                <p className="text-muted mb-1">CNPJ: {cliente.cnpj}</p>
                                                <p className="text-muted mb-1">tel: {cliente.telefone}</p>
                                                <p className="text-muted mb-1">e-mail: {cliente.email}</p>

                                                <p className="text-muted mb-1">contrato:  
                                                {
                                                    cliente.contrato ?
                                                    <> <Badge color="success" className="mr-1">vigente</Badge></>
                                                    :
                                                    <> <Badge color="danger" className="mr-1">Sem contrato</Badge></>
                                                } 
                                                
                                                </p>
                                            </Media>
                                        </Media>
                                    </CardBody>

                                <div className="px-4 py-3 border-top">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item mr-3" id="comments">
                                            <i className="bx bxs-detail mr-1"></i> {0}
                                            <UncontrolledTooltip placement="top" target="comments">
                                               Chamados
                                            </UncontrolledTooltip>
                                        </li>
                                        <li className="list-inline-item mr-3" id="comments">
                                            <i className="bx bxs-user mr-1"></i> {cliente.membros ? cliente.membros.length : 0 }
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
                                                    <DropdownItem tag={Link} to={`cliente/${cliente.pk}`}><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                    <DropdownItem onClick={(e)=>{
                                                        e.stopPropagation();
                                                        delete_func(cliente)
                                                        }}><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
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
        
export default Cardcliente;