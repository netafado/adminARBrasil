import React, {useState} from 'react';
import { Row, Col, Alert, Card, CardBody,Container, Input } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import {Auth} from "aws-amplify"

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

  const ForgetPasswordPage = (props) => {
    const [code, setarCode]         = useState(false);
    const [codigoVerificacao, setarCodigiVerificacao] = useState("");
    const [username, setatrUser]    = useState("");
    const [password, setarPassword] = useState("");


    async function handleValidSubmit(event, values) {

      await Auth.forgotPassword(values.email.toLowerCase().trim() )
        .then(data => {
            setarCode(data.CodeDeliveryDetails)
            setatrUser(values.email.trim())
        })
        .catch(err => {
          console.log(err)
          if (! err.message) {
            toastr.error("Usuário não encontrado.!", "Nenhum usuário com essa combinação")
          } else {
            if(err.message === "Attempt limit exceeded, please try after some time."){
              console.log(err.message === "Attempt limit exceeded, please try after some time")
              return toastr.error("Tente novamento em alguns minutos.", "Você tentou recuperar sua senha muitas vezes")

            }
            toastr.error("Usuário não encontrado.!", "Nenhum usuário com essa combinação")
          }
        })
    }

  async function reenViar() {

    await Auth.forgotPassword(username.toLowerCase().trim() )
    .then(data => {
      console.log(data)
        toastr.success("Codigo reenviado!", "")
        setarCode(data.CodeDeliveryDetails)
    })
    .catch(err => {
      console.log(err)
      if (! err.message) {
        toastr.success("Usuário não encontrado.!", "Nenhum usuário com essa combinação")
      } else {
        if(err.message === "Attempt limit exceeded, please try after some time."){
          console.log(err.message === "Attempt limit exceeded, please try after some time")
          return toastr.error("Tente novamento em alguns minutos.", "Você tentou recuperar sua senha muitas vezes")

        }
        toastr.error("Usuário não encontrado.!", "Nenhum usuário com essa combinação")
      }
    })
  }

    // Upon confirmation redirect the user to the Sign In page
    const forgotPasswordSubmit = async () =>{
      console.log(codigoVerificacao, password)
      if(!codigoVerificacao || !password)
          return toastr.error("Por favor preencha os campos para continuar.", "Erro!")

      await Auth.forgotPasswordSubmit(username.toLowerCase().trim(), codigoVerificacao, password)
      .then(() => {
        toastr.success("Nova senha configurada com sucesso.", "Senha alterada!")
        props.history.push('/login')
        console.log('the New password submitted successfully')
      })
      .catch(err => {
        
        if (! err.message) {
          if(err.message ===  "Invalid verification code provided, please try again."){
            return toastr.error("Erro!", "Codigo de verificação incorreto.")
          }
          toastr.error("Erro!", "Erro ao confirmar nova senha")

        } else {
          toastr.error("Erro!", "Erro ao confirmar nova senha")
        }
      })
    }
     console.log(code)
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
                          <h5 className="text-primary">Esqueci minha senha.</h5>
                          <p>Recupere sua senha.</p>
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

                      {props.forgetError && props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {props.forgetError}
                        </Alert>
                      ) : null}
                      {code ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {`Se o e-email informado existir na nossa base de dados um ${code.DeliveryMedium} será enviado para ${code.Destination || `****`} `}
                        </Alert>
                      ) : null}


                        {code ?
                        <>
                        <div className="form-group">
                          <Input
                            name="codigo"
                            label="código de verificação"
                            className="form-control"
                            autoComplete="off"
                            placeholder="código de verificação"
                            type="text"
                            onChange={(e)=> setarCodigiVerificacao(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <Input
                            className="form-control"
                            placeholder="nova senha"
                            type="password"
                            autoComplete="off"
                            onChange={(e)=> setarPassword(e.target.value)}
                          />
                        </div>
                        <Row>
                          <Col className="text-right">
                              <button
                                  onClick={reenViar}
                                  className="btn btn-primary w-md waves-effect waves-light mr-2"
                                >
                                  reenviar código
                                </button>
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                onClick={forgotPasswordSubmit}
                              >
                                Enviar
                                </button>
                            </Col>
                        </Row>
                        </> : 
                            <AvForm
                            className="form-horizontal mt-4"
                            onValidSubmit={(e,v) => handleValidSubmit(e,v)}
                          >
                          <div className="form-group">
                            <AvField
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Seu e-mail"
                              type="email"
                              errorMessage="Campo inválido ou não é um e-mail."
                              required
                            />

                          </div>
                          <Row className="form-group">
                            <Col className="text-right">
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Resetar
                                </button>
                            </Col>
                          </Row>
                          </AvForm>
                        }


                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Voltar para {" "}
                    <Link
                      to="login"
                      className="font-weight-medium text-primary"
                    >
                      Login
                      </Link>{" "}
                  </p>
                  <p>© {new Date().getFullYear()}  Ar Brasil Compressores. Criado por <i className="fas fa-bacon text-danger"></i> isaiasfrancisco.com.br</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
      );
    }

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
);
