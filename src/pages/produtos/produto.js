import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Label } from "reactstrap";
import Select from 'react-select';
import Dropzone from 'react-dropzone';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const AddProduct = (props) => {

const [selectedFiles, setselectedFiles] = useState([]);

const options = [
            { value: 'AK', label: 'Alaska' },
            { value: 'HI', label: 'Hawaii' },
            { value: 'CA', label: 'California' },
            { value: 'NV', label: 'Nevada' },
            { value: 'OR', label: 'Oregon' },
            { value: 'WA', label: 'Washington' },
        ];

        const options2 = [
            { value: 'AK', label: 'pdf' },
            { value: 'HI', label: 'word' },
            { value: 'CA', label: 'Power Point' },
            { value: 'NV', label: 'Site' },
            { value: 'OR', label: 'url' },

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
                        <Breadcrumbs title="Produtos" breadcrumbItem="Produto" />

                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>

                                        <CardTitle>Informações básicas</CardTitle>
                                        <CardSubtitle className="mb-3">Preencha todas as informações</CardSubtitle>

                                        <Form>
                                            <Row>
                                                <Col sm="6">
                                                    <FormGroup>
                                                        <Label htmlFor="productname">Nome do produto</Label>
                                                        <Input id="productname" name="productname" type="text" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="manufacturername">Fabricante</Label>
                                                        <Input id="manufacturername" name="manufacturername" type="text" className="form-control" />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm="6">
                                                    <FormGroup>
                                                        <Label className="control-label">Categoria</Label>
                                                        <Input id="price" name="price" type="text" className="form-control" />
                                                    </FormGroup>
                                                    <FormGroup className="select2-container">
                                                        <Label className="control-label">Features</Label>
                                                        <Select classNamePrefix="select2-selection" placeholder="Chose..." title="Country" options={options} isMulti />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="12">
                                                    <FormGroup>
                                                        <Label htmlFor="productdesc">Descrição</Label>
                                                        <textarea className="form-control" id="productdesc" rows="5"></textarea>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </Form>

                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-3">Imagens do produto</CardTitle>
                                        <Form>
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
                                                                <h4>Carregar foto do produto</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div
                                                className="dropzone-previews mt-3"
                                                id="file-previews"
                                            >
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>


                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-3">Anexos</CardTitle>
                                        <Form>
                                            
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
                                                        <Button id="price" name="price" type="text" className="form-control" >Salvar</Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>


                                        </Form>
                                    </CardBody>
                                </Card>

                            </Col>
                            <Col>
                                <Button type="submit" color="primary" className="mr-1 waves-effect waves-light">Salvar</Button>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default AddProduct;