import React, {useState} from 'react';

import { Link } from "react-router-dom";
import {  Col, Button, Modal, FormGroup, Label, Input, Row } from "reactstrap";



const ProjectsOverview = ({modal, toggle}) => {


    return (
             <React.Fragment>

                <Modal
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
                        <Col sm="6">
                            <FormGroup>
                                <Label htmlFor="productname">Nome</Label>
                                <input className="form-control" type="text" id="example-datetime-local-input" />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="manufacturerbrand">Telefone</Label>
                                <input className="form-control" type="text"  />
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label htmlFor="productname">Cargo</Label>
                                <input className="form-control" type="text"  />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="manufacturerbrand">email</Label>
                                <input className="form-control" type="text"  />
                            </FormGroup>


                        </Col>
                        <Col sm="12">
                            <FormGroup>
                                <Label htmlFor="price">Foto</Label>
                                <Input id="price" name="price" type="file" className="form-control" />
                            </FormGroup>
                        </Col>
                    </Row>
                    </div>
                    <div className="modal-footer">
                        <FormGroup>
                            <Button  className="form-control" >Salvar</Button>
                        </FormGroup>
                    </div>
                </Modal>
    
            </React.Fragment>
          );
    }
        
export default ProjectsOverview;