import React from 'react';

import { Row, Col, CardBody, Card, Alert,Container, Modal } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser,apiError, modalChangePasswordInit } from '../../store/actions';
import {useSelector, useDispatch} from "react-redux"
// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/SVG/simboloARr.svg";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

 const Login = (props) => {
    // handleValidSubmit
    const modal = useSelector((state)=> state.Login.modalAlterPassword)
    const dispatch = useDispatch()
    const toggleModal = (value)=> {

        dispatch(modalChangePasswordInit(value))
    }
  function  handleValidSubmit(event, values) {
        toastr.info("teste","teste")
        props.loginUser(values, props.history);
    }
          return (
             <React.Fragment>

                        <Modal
                          isOpen={modal}
                          toggle={() => { toggleModal(false) }}
                          centered={true}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">Alterar senha</h5>
                          </div>
                          <div className="modal-body">
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p className="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </div>
                        </Modal>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
                </div>
                <div className="account-pages my-5 pt-sm-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col className="col-7">
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Seja bem-vindo!</h5>
                                                    <p>Entre no sistema com email e senha.</p>
                                                </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img src={profile} alt="" className="img-fluid" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <img src={logo} alt="" className="rounded-circle" height="34" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">

                                            <AvForm className="form-horizontal" onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>

                                                {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="email" label="E-mail"  className="form-control" placeholder="Seu email" type="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="password" label="Password" value="123456" type="password" required placeholder="Enter Password" />
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">lembrar</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Entrar</button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Esqueceu sua senha</Link>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>© {new Date().getFullYear()} ARBRASIL. Criado por <i className="fas fa-bacon text-danger"></i> isaiasfrancisco.com.br</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }

const mapStatetoProps = state => {
    const { error } = state.Login;
    return { error };
}

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(Login));

