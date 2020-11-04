import React, {useState} from 'react';

import { Link } from "react-router-dom";
import {  Col, Button, Modal, FormGroup, Row } from "reactstrap";

import { AvForm, AvField } from 'availity-reactstrap-validation';

import  imageUrls from "../../assets/images/logoEmpresa.jpg"
import {createThumb} from "../../helpers/utils"
const ProjectsOverview = ({modal, toggle}) => {

    const [ImgUrl, setImage] = useState(imageUrls)

    const mudarImg = (e) => {
        createThumb(e, setImage);
    };

    return (
             <React.Fragment>

                <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => { toggle() }}
                    centered={true}
                >
                    <div className="modal-header">
                    <h5 className="modal-title mt-0">Adicinar membro</h5>
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
                    <Col sm={3}>
                    <div className="fileinput text-center">

                    <input type="file" onChange={mudarImg} accept="image/*"/>
                        <div className="thumbnail avatar-upload" style={{backgroundImage: `url(${ImgUrl})`}}></div>
                        <div><Button type="button" className="btn-round btn btn-secondary">Selecione a foto</Button></div>

                    </div>
                    </Col>
                        <Col sm={9}>
                        <AvForm>
                            <Row>
                                <Col sm="12">
                                    <AvField name="nome" label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                                <Col sm="12">
                                    <AvField name="cpf" label="CPF" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <AvField name="telefone" label="Telefone" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                                <Col sm="12">
                                    < AvField name="email" label="Email" type="email" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                        email: {value: true, errorMessage: "formato do email invalido"}
                                    }} />
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
        
export default ProjectsOverview;