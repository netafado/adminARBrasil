import React, {useEffect, useState} from 'react';

import { Container, Row, Col, Input, Button, Spinner } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Cards
import CardProject from "./card-project";

//store
import {listarProdutos}             from "../../store/listaProdutos/actions"
import {useSelector, useDispatch}   from "react-redux"
import {deleteProduct}              from "../../store/product/actions"

import { Link } from 'react-router-dom';

const Produtos  = (props) => {
    const dispatch = useDispatch();
    const {produtcts, loading} = useSelector(state => state.ProdutosLista)
    const [deletarMsg, setDeletarMsg] = useState(false)
    const [idProdDeletar, setIdProdDeletar] = useState(null)
    useEffect( ()=>{
        dispatch(listarProdutos())
    }, [] )

    const deleltarProduto = async (pk) =>{
        setIdProdDeletar(pk)
        abrirModalParaDeletarProduto()
    }

    const confirmDeletarProduto = async() =>{
        await dispatch(deleteProduct(idProdDeletar))
        abrirModalParaDeletarProduto()
        recarregarProdutos();
    }

    const abrirModalParaDeletarProduto = () =>{
        setDeletarMsg(!deletarMsg)
    }

    const recarregarProdutos = () => {
        dispatch(listarProdutos())
    }
 

    const editarProduto = (produto) =>{
        props.history.push({
            pathname: "/editar-produto",
            state: {produto}
        })
    }

    return (
            <React.Fragment>
                <div className="page-content">
                {deletarMsg ? (
                    <SweetAlert
                        danger
                        showCancel
                        title="Tem certeza?"
                        onConfirm={() => confirmDeletarProduto()  }
                        onCancel={() => abrirModalParaDeletarProduto()  }

                    >
                        {"Essa operação não podera ser desfeita!"}
                    </SweetAlert>
                ) : null}
                    <Container fluid>
                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Produtos" breadcrumbItem="Lista de produtos" />
                        <Row className="mb-2">
                            <Col sm="4">
                                <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <Input type="text" className="form-control" placeholder="Procurar produto..." />
                                        <i className="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="8">
                                <div className="text-sm-right">
                                    <Button to="/adicionar-produto" tag={Link} type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> novo Produto</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {loading ?
                             <div className="h-100 w-100 align-items-center d-flex justify-content-center pt-5"><Spinner className="m-auto mt-5"/></div>
                            :<CardProject projects={produtcts} deleltarProduto={deleltarProduto} editarProduto={editarProduto}/>}
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default Produtos;