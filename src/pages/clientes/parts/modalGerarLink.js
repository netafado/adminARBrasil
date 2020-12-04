import React, {useState} from 'react';

import {  Col, Button, Modal, FormGroup, Row, Input } from "reactstrap";
import InputMask            from 'react-input-mask';
import { AvForm, AvField }  from 'availity-reactstrap-validation';
import {Link } from "react-router-dom"

const ModalMembros = ({modal, toggle, enviarClienteNovo}) => {

    const [carregandoLogo, setCarregandoLogo] = useState(false)




    return (
             <React.Fragment>
                <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => { toggle() }}
                    centered={true}
                >
                    <div className="modal-header">
                    <h5 className="modal-title mt-0">Gerar Link</h5>
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
                    <div className="text-center">
                                            <Row>
                                                <Col sm="4">
                                                    <div>
                                                        <div className="font-size-24 text-primary mb-2">
                                                        <i className="fab fa-whatsapp"></i>
                                                        </div>
                                    
                                                        <p className="text-muted mb-2">Envie o link por whatsap</p>
                                                        <h5>Whatsapp</h5>
    
                                                        <div className="mt-3">
                                                            <Link to="#" className="btn btn-primary btn-sm w-md">Enviar</Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm="4">
                                                    <div className="mt-4 mt-sm-0">
                                                        <div className="font-size-24 text-primary mb-2">
                                                            <i className="far fa-envelope"></i>
                                                        </div>
                                    
                                                        <p className="text-muted mb-2">Por email</p>
                                                        <h5>e-mail</h5>
    
                                                        <div className="mt-3">
                                                            <Link to="#" className="btn btn-primary btn-sm w-md">Enviar</Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm="4">
                                                    <div className="mt-4 mt-sm-0">
                                                        <div className="font-size-24 text-primary mb-2">
                                                            <i className="fas fa-link"></i>
                                                        </div>
                                                        <p className="text-muted mb-2">Receber link</p>
                                                        <h5>Link</h5>
    
                                                        <div className="mt-3">
                                                            <Link to="#" className="btn btn-primary btn-sm w-md">Copiar link</Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                    </div>
                    <div className="modal-footer">

                    </div>
                </Modal>
    
            </React.Fragment>
          );
    }
        
export default ModalMembros;