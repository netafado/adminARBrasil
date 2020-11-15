import React, {useEffect, useState} from 'react';

import { Container, Row, Col, Input, Button, Spinner  } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs                  from '../../components/Common/Breadcrumb';
import {useDispatch, useSelector}   from "react-redux"
import {listarClientes}             from "../../store/clientes/actions"
//Import Cards
import ClientesCards                from "./cardCliente";
import SweetAlert                   from "react-bootstrap-sweetalert";
import { Link }                     from 'react-router-dom';
import { deleteCliente as deletarCliente_action }   from "../../store/clientes/actions" 

const ListarCliente  = (props) => {
    const dispatch =                useDispatch()
    const {clientes, loading} =     useSelector(state => state.Clientes)
    const [deletarClienteModal, setdeletarClienteModal] =   useState(null)
    const [clienteDeletado, setClienteDeletado]         =   useState(null)
    const [termoFiltro, setTermoFiltro]                 =   useState("");
    const [clientesFiltrados, setClientesFiltrados]     =   useState([])

    useEffect(()=>{
        dispatch(listarClientes())
    }, [])

    useEffect(()=>{
        setClientesFiltrados( clientes )
    }, [clientes])

    useEffect(()=>{
        if(!termoFiltro){
            setClientesFiltrados([...clientes])
        }else{
            const filtrar = clientes.filter( (item) => {
                return   item.razaoSocial.toLowerCase().indexOf( termoFiltro.toLowerCase() ) >= 0
            } )
            setClientesFiltrados( filtrar )
        }
    }, [termoFiltro, clientes])

    const reload = () => {
        dispatch(listarClientes())
    }
    const deletarCliente = (itemDelete)=> {
        console.log("DELETAR CLIENTE", itemDelete)
        abrirModalParaDeletarClientes(itemDelete)
        setClienteDeletado(itemDelete.pk)
    }

    const setTermoFiltroFunc  = (e) =>{
        console.log(e.target.value)
        setTermoFiltro(e.target.value)
    } 
    
    const  confirmDeletarCliente = () =>{
        dispatch(deletarCliente_action(clienteDeletado))
        abrirModalParaDeletarClientes()
        reload();
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
                        <Breadcrumbs title="Clientes" breadcrumbItem="Lista de clientes" />

                        <Row className="mb-2">
                            <Col xs="6">
                                <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <Input type="text" onChange={setTermoFiltroFunc} className="form-control" placeholder="Procurar..." />
                                        <i className="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="6">
                                <div className="text-sm-right">
                                    <Button to="/clientes-adicionar" tag={Link} type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> novo Cliente</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {loading ?  <div className="h-100 w-100 align-items-center d-flex justify-content-center pt-5"><Spinner className="m-auto mt-5"/></div>
                            :  <ClientesCards clientes={clientesFiltrados} delete_func={deletarCliente}/>}
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default ListarCliente;