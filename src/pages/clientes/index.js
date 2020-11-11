import React, {useEffect, useState} from 'react';

import { Container, Row, Col, Input, Button } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs                  from '../../components/Common/Breadcrumb';
import {useDispatch, useSelector}   from "react-redux"
import {listarClientes}             from "../../store/clientes/actions"
//Import Cards
import ClientesCards                from "./cardCliente";
import SweetAlert                   from "react-bootstrap-sweetalert";
import { Link }                     from 'react-router-dom';
import { deleteCliente as deletarCliente_action }           from "../../store/clientes/actions" 

const ProjectsGrid  = (props) => {
    const dispatch =                useDispatch()
    const {clientes, loading} =     useSelector(state => state.Clientes)
    const [deletarClienteModal, setdeletarClienteModal] =   useState(null)
    const [clienteDeletado, setClienteDeletado]         =   useState(null)
    useEffect(()=>{
        dispatch(listarClientes())
    }, [])


    const deletarCliente = (itemDelete)=> {
        console.log("DELETAR CLIENTE", itemDelete)
        abrirModalParaDeletarClientes(itemDelete)
        setClienteDeletado(itemDelete.pk)
    }
    
    const  confirmDeletarCliente = () =>{
        dispatch(deletarCliente_action(clienteDeletado))
        abrirModalParaDeletarClientes()
    }

    const abrirModalParaDeletarClientes = ()=> {
        setdeletarClienteModal(!deletarClienteModal)
    }
    return (
            <React.Fragment>
                <div className="page-content">

                {deletarClienteModal ? (
                    <SweetAlert
                        danger
                        showCancel
                        title="Tem certeza?"
                        onConfirm={() => confirmDeletarCliente()  }
                        onCancel={() => abrirModalParaDeletarClientes()  }

                    >
                        {"Essa operação não podera ser desfeita!"}
                    </SweetAlert>
                ) : null}
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Clientes" breadcrumbItem="Lista de clientes" />
                        <Row className="mb-2">
                            <Col sm="4">
                                <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <Input type="text" className="form-control" placeholder="Procurar..." />
                                        <i className="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="8">
                                <div className="text-sm-right">
                                    <Button to="/clientes-adicionar" tag={Link} type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> novo Cliente</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {/* Import Cards */}
                            <ClientesCards clientes={clientes} delete_func={deletarCliente}/>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default ProjectsGrid;