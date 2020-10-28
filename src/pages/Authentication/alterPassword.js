import React from 'react';

import { Row, Col, CardBody, Card, Alert,Container } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {useSelector} from "react-redux"

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser,apiError } from '../../store/actions';

import {Auth} from "aws-amplify"
// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/SVG/simboloARr.svg";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'



const AlterPassword = (props) => {
    const user = useSelector(state => state.Login.user)
    const passwordChanced = (data) => {
        toastr.success("Sua senha foi alterada", "Senha alterada")
    }
    const passwordChancedFailed = (e) =>{
        toastr.error("Erro ao alterar senha",e)

    }
    async function changePassword(event, values) {
        await Auth.completeNewPassword(user, values.oldPassword, values.newpassword)
        .then( data => passwordChanced(data) )
        .catch(err => passwordChancedFailed(err))
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
                                                    <h5 className="text-primary">Trocar senha!</h5>
                                                    <p>Antes de prosseguir altere sua senha.</p>
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

                                            <AvForm className="form-horizontal" onValidSubmit={(e,v) => { changePassword(e,v) }}>

                                                {props.error && props.error ? <Alert color="danger">{props.error}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="oldPassword" label="Senha atual" errorMessage="Campo obrigatório"  className="form-control" placeholder="Senha atual" type="password" required />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="newPassword" label="Nova Senha"  errorMessage="Campo obrigatório" type="password" required placeholder="Nova senha" />
                                                </div>


                                                <div className="mt-3">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Trocar senha</button>
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

export default withRouter(connect(mapStatetoProps, { loginUser,apiError })(AlterPassword));

