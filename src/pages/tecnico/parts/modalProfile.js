import React, {useState} from 'react';

import {  Col,  Modal,  Row } from "reactstrap";

import Welcome from "./WelcomeComp"

const ModalChamados = ({modal, toggle, user}) => {



    return (
             <React.Fragment>

                <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => { toggle() }}
                    centered={true}
                >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0">Informações: {user.nome}</h5>
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
                            <Welcome user={user}/>
                        </Col>
                    </Row>
                    </div>
                    <div className="modal-footer">

                    </div>
                </Modal>
    
            </React.Fragment>
          );
    }
        
export default ModalChamados;