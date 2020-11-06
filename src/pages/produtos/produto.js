import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button, Table, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Select from 'react-select';
import {Link} from "react-router-dom"
import { AvForm, AvField } from 'availity-reactstrap-validation';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// store 
import {saveNewProduct} from "../../store/product/actions"

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import  imageUrls from "../../assets/images/logoEmpresa.jpg"
import {createThumb} from "../../helpers/utils"
import { useDispatch } from 'react-redux';

const filesTypes = [
    { value: 'pdf', label: 'pdf' },
    { value: "word", label: 'word' },
    { value: 'Power Point', label: 'Power Point' },
    { value: 'url', label: 'url' },
    { value: 'imagem', label: 'Imagem' },
]

const AddProduct = (props) => {

    const [anexos, setAnexos] = useState([]);
    const [newAnexo, setNewAnexo] = useState({url: "", extensao: "", nome: ""})
    const [ImgUrl, setImage] = useState({url:imageUrls})
    const dispatch = useDispatch();
    const mudarImg = (e) => {
        createThumb(e, (e)=> {
            setImage( {...ImgUrl, url: e} )
        });
    };

    const handleValidSubmit = (e, values) =>{
        console.log(values)
        values.imagens = [
            ImgUrl
        ]
        values.anexos = anexos
        dispatch(saveNewProduct(values))
    }

    const changeNewAnexoURL = (e) =>{
        console.log("changeNewAnexoURL")
        let anexo = {...newAnexo}
        anexo.url = e.target.value
        setNewAnexo(anexo)
    }

    const chagenNewAnexoType = (e) => {
        let anexo = {...newAnexo}
        anexo.extensao = e.value
        setNewAnexo(anexo)
    }

    const changeNewAnexoName = (e) => {
        let anexo = {...newAnexo}
        anexo.nome = e.target.value
        setNewAnexo(anexo)    
    }

    const saveNewAnexo = (e) =>{
        e.preventDefault()
        if(!newAnexo.extensao)
            return toastr.error("È necessario adicionar um tipo ao anexo", "Erro ao tentar salvar anexo")
        if(!newAnexo.url)
            return toastr.error("È necessario adicionar uma url ao anexo", "Erro ao tentar salvar anexo")
        if(!newAnexo.nome)
            return toastr.error("È necessario adicionar uma nome ao anexo", "Erro ao tentar salvar anexo")

        let newAnexos = [...anexos]
        newAnexos.push(newAnexo)
        setAnexos(newAnexos);
    }


    console.log(ImgUrl)
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
                                                    <div className="thumbnail" style={{backgroundImage: `url(${ImgUrl.url})`}}></div>
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
                                                            <AvField name="categoria" label="categoria" type="text" errorMessage="Campo obrigatório" validate={{
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
                                                    <FormGroup className="select2-container" >
                                                        <Select classNamePrefix="select2-selection" placeholder="Tipo..." title="Country" options={filesTypes} onChange={chagenNewAnexoType} />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="4">
                                                    <FormGroup>
                                                        <Input name="nameAnexo" type="text"  placeholder="Um nome para o anexo"  onChange={changeNewAnexoName} className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="4">
                                                    <FormGroup>
                                                        <Input id="price" name="price" type="text" onChange={changeNewAnexoURL} placeholder="www.enderecodoarquivo.com" className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm='2'>
                                                    <FormGroup>
                                                        <Button onClick={saveNewAnexo} type="text" className="form-control" >Novo anexo</Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="12">
                                                <Table className="project-list-table table-nowrap table-centered table-borderless">

                                            <tbody>
                                                {anexos.map( ((anexo, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td width={42}>
                                                                <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                    <span className="avatar-title rounded-circle">
                                                                        <i className="bx bxs-file-pdf font-size-24"></i>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">{anexo.name}</Link></h5>
                                                            </td>
                                                            <td className="text-right">
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle href="#" className="card-drop" tag="i">
                                                                        <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu right>
                                                                        <DropdownItem href="#">Deletar</DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </td>
                                                    </tr>
                                                    )
                                                }) )}

                                            </tbody>
                                        </Table>
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