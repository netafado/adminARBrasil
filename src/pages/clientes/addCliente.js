import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Select from 'react-select';
import Dropzone from 'react-dropzone';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const EcommerceAddProduct = (props) => {

const [selectedFiles, setselectedFiles] = useState([]);

const options = [
            { value: 'AK', label: 'Alaska' },
            { value: 'HI', label: 'Hawaii' },
            { value: 'CA', label: 'California' },
            { value: 'NV', label: 'Nevada' },
            { value: 'OR', label: 'Oregon' },
            { value: 'WA', label: 'Washington' },
        ];

     function handleAcceptedFiles(files){
        files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size)
        }));
        
        setselectedFiles(files);
    }

    function formatBytes(bytes, decimals = 2)
    {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


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
                                        <CardSubtitle className="mb-3">Prerencha todos os campos abaixo</CardSubtitle>

                                        <Form>
                                            <Row>
                                                <Col sm="6">
                                                    <FormGroup>
                                                        <Label htmlFor="productname">Nome</Label>
                                                        <Input id="productname" name="productname" type="text" className="form-control" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label htmlFor="manufacturerbrand">CEP</Label>
                                                        <Input id="manufacturerbrand" name="manufacturerbrand" type="text" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="price">Enredeço</Label>
                                                        <Input id="price" name="price" type="text" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="price">Bairro</Label>
                                                        <Input id="price" name="price" type="text" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="price">Estado</Label>
                                                        <Input id="price" name="price" type="text" className="form-control" />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm="6">
                                                    <FormGroup>
                                                        <Label htmlFor="manufacturername">CNPJ  </Label>
                                                        <Input id="manufacturername" name="manufacturername" type="text" className="form-control" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label htmlFor="productdesc">Logo da emppresa</Label>
                                                        <Dropzone
                                                            onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles) }
                                                            }
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div className="dropzone">
                                                                        <div
                                                                            className="dz-message needsclick"
                                                                            {...getRootProps()}
                                                                        >
                                                                            <input {...getInputProps()} />
                                                                            <div className="dz-message needsclick">
                                                                                <div className="mb-3">
                                                                                    <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                                                                </div>
                                                                                <h4>Logo da Empresa</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </Dropzone>
                                                    </FormGroup>

                                                </Col>

                                            </Row>
                                        </Form>

                                    </CardBody>
                                </Card>


                                <Card>
                                    <CardBody>
                                        <Button type="submit" tag={Link} to="/cliente" color="primary" className="mr-1 waves-effect waves-light">Salvar</Button>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default EcommerceAddProduct;