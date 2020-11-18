import React, {useState} from 'react';

import {  Col, Button, Modal, FormGroup, Row } from "reactstrap";
import { AvForm, AvField }  from 'availity-reactstrap-validation';
import {useSelector}        from "react-redux"

const ModalProdutos = ({modal, toggle, enviarNovoProduto}) => {
    const {produtcts}  = useSelector(state => state.ProdutosLista)
    return (
             <React.Fragment>

                <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => { toggle() }}
                    centered={true}
                >
                    <div className="modal-header">
                    <h5 className="modal-title mt-0">Adicionar produto ao cliente.</h5>
                    <button
                        type="button"
                        onClick={() => { toggle(false) } }
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">

                    <Row>
                        <Col sm={12}>
                        <AvForm  onValidSubmit={(e,v) => { enviarNovoProduto(e,v) }}>
                            <Row>
                                <Col sm="12">
                                <AvField type="select" 
                                    validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }}
                                     name="pk" label="Escolha o produto" >
                                    <option>Escolha um produto</option>
                                    {produtcts.map((produto) =>{
                                        return <option key={produto.pk} value={produto.pk}>{produto.nome}</option>
                                    })}
                                </AvField>
                                </Col>
                                <Col sm="12">
                                    < AvField name="setup" label="Setup" type="textarea" errorMessage="Campo obrigatório"  />
                                </Col>
                            </Row>
                            <FormGroup>
                                <Button type="submit"  className="form-control" >Salvar</Button>
                            </FormGroup>
                        </AvForm>
                        </Col>
                    


                </Row>
                    </div>
                    <div className="modal-footer">

                    </div>
                </Modal>
    
            </React.Fragment>
          );
    }
        
export default ModalProdutos;