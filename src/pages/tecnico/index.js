import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Card
import CardContact from "./card-contact";

//redux
import {useSelector, useDispatch} from "react-redux"
import { listarTecnicos, deleteTecnico } from "../../store/tecnicos/actions"
//Import Images

import ModalChamados from "./parts/modalChamados"

const ContactsGrid = (props) => {
    const {tecnicos} = useSelector(state => state.Tecnicos)
    const [modalChamado, setModalChamado] = useState(false)
    const dispatch = useDispatch()
    const [deletarMsg, setDeletarMsg] = useState(false)
    const [idTecnicoDeletar, setIdTecnicoDeletar] = useState(null)
    useEffect(()=>{
        dispatch( listarTecnicos() )
    }, [])
    const toggleChamado = () =>{
        setModalChamado(!modalChamado)
    }

    const deletarTecnico = async (pk) =>{
        setIdTecnicoDeletar(pk)
        abrirModalParaDeletarTecnico()
    }
    const confirmDeletarProduto = async() =>{
        await dispatch(deleteTecnico(idTecnicoDeletar))
        abrirModalParaDeletarTecnico()
        recarregarProdutos();
    }

    const abrirModalParaDeletarTecnico = () =>{
        setDeletarMsg(!deletarMsg)
    }

    const recarregarProdutos = () => {
        dispatch(listarTecnicos())
    }

    return (
          <React.Fragment>
              <ModalChamados modal={modalChamado} toggle={toggleChamado} />
                <div className="page-content">
                {deletarMsg ? (
                    <SweetAlert
                        danger
                        showCancel
                        title="Tem certeza?"
                        onConfirm={() => confirmDeletarProduto()  }
                        onCancel={() => abrirModalParaDeletarTecnico()  }

                    >
                        {"Essa operação não podera ser desfeita!"}
                    </SweetAlert>
                ) : null}

                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Técnicos" breadcrumbItem="lista de técnicos" />
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
                                    <Button type="button" tag={Link}  to="/adicionar-tecnico" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2">
                                        <i className="mdi mdi-plus mr-1"></i> novo Técnico
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {tecnicos.length <= 0 ? <Col><p>Nenhum cadastro.</p></Col> : null}
                            {
                                tecnicos.map((tecnico, key) =>
                                    <CardContact user={tecnico} abrirModal={toggleChamado} key={"_user_" + key} deletarTecnico={deletarTecnico}/>
                                )
                            }

                        </Row>

                    </Container>
                </div>
            </React.Fragment>

          );
    }
        
export default ContactsGrid;