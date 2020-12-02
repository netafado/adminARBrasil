import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Spinner } from "reactstrap";
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
import ModalProfile from "./parts/modalProfile"

const ContactsGrid = (props) => {
    const {tecnicos, loading} = useSelector(state => state.Tecnicos)
    const [modalChamado, setModalChamado]           = useState(false)
    const [modalProfile, setModalProfile]           = useState(false)
    const [userProfile, setUserProfile] = useState({})
    const dispatch = useDispatch()
    const [deletarMsg, setDeletarMsg]               = useState(false)
    const [idTecnicoDeletar, setIdTecnicoDeletar]   = useState(null)
    const [termoFiltro, setTermoFiltro]             = useState("");
    const [tecnicoFiltrado, settecnicoFiltrado]     = useState([])
    const toggleModalProfile = (user) =>{
        
        setModalProfile(!modalProfile)
    }
    const setUser = (user) =>{
        setUserProfile(user)
        setModalProfile(true)
    }
    const setTermoFiltroFunc  = (e) =>{
        console.log(e.target.value)
        setTermoFiltro(e.target.value)
    }

    const editarTecnico = (user) => {
        props.history.push({
            pathname: "/tecnico-editar",
            state: {tecnico:{...user}}
        })
    }

    useEffect(()=>{
        settecnicoFiltrado( tecnicos )
    }, [tecnicos])
    console.log(tecnicos)
    useEffect(()=>{
        if(!termoFiltro){
            settecnicoFiltrado([...tecnicos])
        }else{
            const filtrar = tecnicos.filter( (item) => {
                return   item.nome.toLowerCase().indexOf( termoFiltro.toLowerCase() ) >= 0
            } )
            settecnicoFiltrado( filtrar )
        }
    }, [termoFiltro, tecnicos])

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
    const confirmarDeletarCliente = async() =>{

        await dispatch(deleteTecnico(idTecnicoDeletar))
        abrirModalParaDeletarTecnico()
    }

    const abrirModalParaDeletarTecnico = () =>{
        setDeletarMsg(!deletarMsg)
    }


    return (
          <React.Fragment>
              <ModalChamados modal={modalChamado} toggle={toggleChamado} />
              <ModalProfile modal={modalProfile} toggle={toggleModalProfile}  user={userProfile}/>
                <div className="page-content">
                {deletarMsg ? (
                    <SweetAlert
                        danger
                        showCancel
                        title="Tem certeza?"
                        onConfirm={(e) => confirmarDeletarCliente(e)  }
                        onCancel={() => abrirModalParaDeletarTecnico()  }

                    >
                    {"Essa operação não podera ser desfeita!"}
                    </SweetAlert>
                ) : null}

                    <Container fluid>
                        <Breadcrumbs title="Técnicos" breadcrumbItem="lista de técnicos" />
                        <Row className="mb-2">
                            <Col sm="4">
                                <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <Input type="text" className="form-control" onChange={setTermoFiltroFunc} placeholder="Procurar..." />
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
                        {loading ?  <div className="h-100 w-100 align-items-center d-flex justify-content-center pt-5"><Spinner className="m-auto mt-5"/></div>: 
                        
                            <>
                                {tecnicoFiltrado.length <= 0 ? <Col><p>Nenhum cadastro.</p></Col> : null}
                                {
                                    tecnicoFiltrado.map((tecnico, key) =>
                                        <CardContact editarTecnico={editarTecnico} user={tecnico} toggleModalProfile={setUser} abrirModal={toggleChamado} key={"_user_" + key} deletarTecnico={deletarTecnico}/>
                                    )
                                }
                            </>

                            }
                            

                        </Row>
                    </Container>
                </div>
            </React.Fragment>

          );
    }
        
export default ContactsGrid;