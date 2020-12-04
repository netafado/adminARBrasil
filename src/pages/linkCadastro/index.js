import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Table, CardTitle, Alert } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ModalCliente from "./parts/modalClienteEditar"
//Import Countdown
import Countdown from "react-countdown";

import InfoCliente from "./clienteInfo"
import BaixarApp from "./baixarAplicativo"
//Import Images
import logo from "../../assets/images/logo-dark.png";

const CadastroLInk = (props) => {
    const [link, setLink]       = useState(true)
    const [loading, setLoading] = useState(false)
    const [faltaCadastrar, setFataCadastrar]    = useState(true)

    const [modal, setModal]                     = useState(false)

    const [user , setUser]                      = useState({})
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state
                return <Alert color="danger" className="m-auto"><span className="font-size-14">Esse link expirou por favor solicitar outro cadastro!</span></Alert>;
            } else {
                return <>
                <div className="coming-box">{days} <span>Dias</span></div> <div className="coming-box">{hours} <span>Horas</span></div> <div className="coming-box">{minutes} <span>Minutos</span></div> <div className="coming-box">{seconds} <span>Segundos</span></div>
                </>
            }
        }

    const handleValidSubmit = (e,v) => {
        // invalidar link
        // mostrar link para a loja dos aplicativos
        setFataCadastrar(false)
    }

    const atualizarInfo = () =>{

    }

    const toggleModal = () =>{
        setModal(!modal)
    }

    return (
          <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-white"><i className="fas fa-home h2"></i></Link>
                </div>
                <ModalCliente modal={modal} toggle={toggleModal} enviarClienteNovo={atualizarInfo} user={user} />
                <div className="my-5 pt-sm-5">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="text-center">
                                    <Link to="/">
                                        <img src={logo} alt="logo" height="28" />
                                    </Link>
                                    {link ? 
                                        <>
                                            <h4 className="mt-5">Finalize seu cadastro</h4>
                                            <p className="text-muted">Confirme as informações e cadastre uma senha para usar o aplicatico.</p>
                                            <Row  className="justify-content-center">
                                                <Col sm={8}>
                                                <Card>
                                                    <CardBody>
                                                        {faltaCadastrar ?
                                                        <>
                                                        <CardTitle className="mb-4 text-left">Suas informações: 
                                                        <button type="button" onClick={toggleModal} className="btn btn-rounded btn-success waves-effect waves-light float-right">
                                                            <i className="mdi mdi-pencil d-block font-size-16"></i>
                                                        </button>
                                                        </CardTitle>
                                                        <div className="table-responsive">
                                                            <InfoCliente />
                                                            <AvForm className="form-horizontal text-left mt-4" onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>
                                                                <div className="form-group">
                                                                    <AvField name="password" label="Senha"  errorMessage="Campo obrigatório" type="password" required placeholder="Senha" />
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
                                                            </AvForm>
                                                        </div>
                                                        </>

                                                        : 
                                                        <BaixarApp />
                                                        
                                                        }

                                                    </CardBody>
                                                </Card>
                                                </Col>
                                            </Row>

                                            {faltaCadastrar ?
                                                <>
                                                <p className="text-muted mt-3">Por segurança esse link irá expirar em:</p>
                                                <Row className="justify-content-center mt-1">
                                                    <Col md="8">
                                                        <div className="counter-number text-center">
                                                            <Countdown
                                                                date="2020/12/17"
                                                                renderer={renderer}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                </>
                                            : null}

                                        </>
                                    :
                                        <Row className="justify-content-center mt-5">
                                            <Col sm={6}>
                                                <Alert color="danger" className="m-auto"><span className="font-size-14">Esse link expirou por favor solicitar outro cadastro!</span></Alert>
                                            </Col>
                                        </Row>
                                    }


                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
 
          );
    }
        
export default CadastroLInk;