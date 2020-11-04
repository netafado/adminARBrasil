import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col,  Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import  imageUrls from "../../assets/images/logoEmpresa.jpg"

import {createThumb} from "../../helpers/utils"

const AdicionarCliente = (props) => {


    const [ImgUrl, setImage] = useState(imageUrls)

    function formatBytes(bytes, decimals = 2)
    {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const mudarImg = (e) => {
        createThumb(e, setImage);
    };

    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Novo Cliente" breadcrumbItem="adicionar Cliente" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Informações da Empresa</CardTitle>
                                        <CardSubtitle className="mb-3">Preencha todos os campos abaixo</CardSubtitle>
                                        <AvForm>
                                            <Row>
                                                <Col sm={3}>
                                                <div className="fileinput text-center">
                                                    <input type="file" onChange={mudarImg} accept="image/*" />
                                                    <div className="thumbnail avatar-upload" style={{backgroundImage: `url(${ImgUrl})`}}></div>
                                                    <div><Button type="button" className="btn-round btn btn-secondary">Selecione o logo</Button></div>
    
                                                </div>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="nome" label="Nome do produto" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="6">
                                                            <AvField name="cnpj" label="CNPJ" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="telefone" label="Telefone" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="6">
                                                            < AvField name="email" label="Email" type="email" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                                email: {value: true, errorMessage: "formato do email invalido"}
                                                            }} />
                                                        </Col>
                                                    </Row>

                                                </Col>

                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col sm={6}>
                                                            < AvField name="cep" label="CEP" type="text" errorMessage="Campo obrigatório" />
                                                        </Col>
                                                        <Col sm={6}>
                                                             <AvField name="rua" label="rua" type="text" errorMessage="Campo obrigatório" />   
                                                        </Col>
                                                        <Col sm={6}>
                                                            <AvField name="bairro" label="Bairro" type="text" errorMessage="Campo obrigatório" />   
                                                        </Col>
                                                        <Col sm={4}>
                                                            <AvField name="cidade" label="Cidade" type="text" errorMessage="Campo obrigatório" />   
                                                        </Col>
                                                        <Col sm={2}>
                                                        <AvField type="select" name="estado" label="Estados" >
                                                                <option>AC</option>
                                                                <option>AL</option>
                                                                <option>AP</option>
                                                                <option>AM</option>
                                                                <option>BA</option>
                                                                <option>CE</option>
                                                                <option>CE</option>
                                                                <option>GO</option>
                                                                <option>MA</option>
                                                                <option>MT</option>
                                                                <option>MS</option>
                                                                <option>MG</option>
                                                                <option>PA</option>
                                                                <option>PB</option>
                                                                <option>PR</option>
                                                                <option>PE</option>
                                                                <option>PI</option>
                                                                <option>RJ</option>
                                                                <option>RN</option>
                                                                <option>RS</option>
                                                                <option>RO</option>
                                                                <option>RR</option>
                                                                <option>SP</option>
                                                                <option>SE</option>
                                                                <option>TO</option>  
                                                                <option>DF</option> 
                                                            </AvField>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button type="submit"  color="primary" className="mr-1 waves-effect waves-light">Salvar</Button>
                                                </Col>
                                            </Row>
                                        </AvForm>

                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default AdicionarCliente;