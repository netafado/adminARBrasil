import React from 'react';

import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

// Redux
import { useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser } from '../../store/actions';

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/SVG/simboloARr.svg";
import {useDispatch} from "react-redux"

 const Login = (props) => {
    // handleValidSubmit
    const dispatch = useDispatch()
    const { error, loading } = useSelector((state) => state.Login) ;

  function  handleValidSubmit(event, values) {
        dispatch(loginUser(values, props.history));
    }
          return (
             <React.Fragment>
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
                                                        <img src={logo} alt="" height="34" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">

                                            <AvForm className="form-horizontal" onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>

                                                {error && error ? <Alert color="danger">{error}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="email" label="E-mail" errorMessage="Campo obrigatório"  className="form-control" placeholder="Seu email" type="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="password" label="Senha"  errorMessage="Campo obrigatório" type="password" required placeholder="Senha" />
                                                </div>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">lembrar</label>
                                                </div>

                                                <div className="mt-3">
                                                    <button disabled={loading}  className="btn btn-primary btn-block waves-effect waves-light" type="submit">
                                                        {
                                                            loading ?
                                                            <>
                                                                <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2"></i>Carregando
                                                            </>
                                                            :
                                                            "Entrar"
                                                        }
                                                    </button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Esqueceu sua senha</Link>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>© {new Date().getFullYear()}  Ar Brasil Compressores. Criado por <i className="fas fa-bacon text-danger"></i> isaiasfrancisco.com.br</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
        }



export default withRouter(Login);

