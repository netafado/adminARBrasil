import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import Select from 'react-select';

import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import  imageUrls from "../../assets/images/logoEmpresa.jpg"
import {createThumb} from "../../helpers/utils"

const AddProduct = (props) => {

    const [ImgUrl, setImage] = useState(imageUrls)
        const options2 = [
            { value: 'AK', label: 'pdf' },
            { value: 'HI', label: 'word' },
            { value: 'CA', label: 'Power Point' },
            { value: 'NV', label: 'Site' },
            { value: 'OR', label: 'url' },

        ];


    const mudarImg = (e) => {
        createThumb(e, setImage);
    };


    const handleValidSubmit = (e, values) =>{
        console.log(values)
    }


    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Produtos" breadcrumbItem="Produto" />

                        <Row>
                            <Col xs="12">
                                <AvForm  onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>
                                    <Card>
                                        <CardBody>

                                            <CardTitle>Informações básicas</CardTitle>
                                            <CardSubtitle className="mb-3">Preencha todas as informações</CardSubtitle>
                                            <Row>
                                                <Col sm="3">
                                                <div className="fileinput text-center">

                                                <input type="file" onChange={mudarImg} accept="image/*"/>
                                                    <div className="thumbnail" style={{backgroundImage: `url(${ImgUrl})`}}></div>
                                                    <div><Button type="button" className="btn-round btn btn-secondary">Selecione a foto</Button></div>
                                                </div>
                                                </Col>
                                                <Col sm="9">
                                                    <Row>
                                                        <Col sm="3">
                                                        <AvField name="nome" label="Nome do produto" type="text" errorMessage="Campo obrigatório" validate={{
                                                            required: {value: true, errorMessage: 'Campo obrigatório'},
                                                        }} />

                                                        </Col>
                                                        <Col sm="3">
                                                            <AvField name="fabricante" label="Fabricante" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>

                                                        <Col sm="3">
                                                            <AvField name="Categoria" label="categoria" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />

                                                        </Col>
                                                        <Col sm="3">
                                                            <AvField name="informacao_adicional" label="Informação adicional" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="12">
                                                            <AvField name="descricao" label="Descrição" type="textarea" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>

                                                    </Row>
                                                         
                                                </Col>

                                            </Row>
                                            <hr />
                                            <CardTitle className="mb-3">Anexos</CardTitle>
                                            <Row>
                                                <Col sm="2">
                                                    <FormGroup className="select2-container">
                                                        <Select classNamePrefix="select2-selection" placeholder="Tipo..." title="Country" options={options2} />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="8">
                                                    <FormGroup>
                                                        <Input id="price" name="price" type="text" placeholder="www.enderecodoarquivo.com" className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm='2'>
                                                    <FormGroup>
                                                        <Button id="price" name="price" type="text" className="form-control" >Novo anexo</Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col>                                
                                                    <Button type="submit" color="primary" className="mr-1 waves-effect waves-light">Salvar</Button>
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                    </AvForm>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default AddProduct;