import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button,  Spinner, InputGroup, InputGroupAddon} from "reactstrap";
import Select from 'react-select';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// store 
import {updateProduct} from "../../store/product/actions"
import { Storage } from "aws-amplify"
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import  imageUrls from "../../assets/images/logoEmpresa.jpg"
import { useDispatch, useSelector } from 'react-redux';
import config from "../../aws-exports"
import Anexos from "../../components/anexos"
import CarregarArquivo from "./CarregarArquivo"
const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
  } = config

const filesTypes = [
    { value: 'pdf', label: 'pdf' },
    { value: "word", label: 'word' },
    { value: 'power-point', label: 'Power Point' },
    { value: 'url', label: 'Site' },
    { value: 'imagem', label: 'Imagem' },
    { value: 'sr', label: 'Soluções rapidas' },
    { value: 'outro', label: 'Outro' },
]

const EditarProduto = (props) => {
    const produto = props.location.state.produto;
    const [anexos, setAnexos]                   = useState( produto.anexos || []);
    const [modalUpload, setModalUpload]         = useState(false);
    const [carregandoFoto, setCarregandoFoto]   = useState(false)
    const [newAnexo, setNewAnexo]               = useState({url: "", extensao: "", nome: "", descricao: ""})
    const [image, setImage]                     = useState(  produto.imagens ? produto.imagens[0] || {url:imageUrls, extensao: null, descricao: "", extensao: ""} : {url:imageUrls, extensao: null, descricao: "", extensao: ""})
    const loading                               = useSelector(state => state.Products.loading)
    const dispatch                              = useDispatch();
    console.log(props.location.state.produto)
    const salvarToStorage = async(e) => {
        const file = e.target.files[0]
        setCarregandoFoto(true)
        if (file) {
            const key = `produtos/${uuidv4()}${file.name.replace(/ /g,'')}`      
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
            try {
              await Storage.put(key, file)
              .then (result => {
                  console.log(result, url)
                  const newImge = {...image, url: url, extensao: file.type, descricao: file.name}
                  setImage(newImge)
              })
            } catch (err) {
              console.log('error: ', err)
            }
          }
        setCarregandoFoto(false)
    }

    const handleValidSubmit = async(e, values) =>{
        values.imagens = [
            image
        ]
        values.anexos = anexos
        values.pk = produto.pk
        console.log(values)
        await dispatch(updateProduct(values, props.history))
        return toastr.success("Editar Produto", "Produto salvo com sucesso!")
    }

    const changeNewAnexoURL = (e) =>{
        let anexo = {...newAnexo}
        anexo.url = e.target.value
        setNewAnexo(anexo)
    }

    const updateUrldoAnexo = (url) => {
        let anexo = {...newAnexo}
        anexo.url = url
        setNewAnexo(anexo)
        toggleModalUpload()
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

    const removerAnexo = (index) => {
        let newAnexos = [...anexos];
        newAnexos.splice(index, 1)
        console.log(newAnexos)
        setAnexos(newAnexos)
       
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
        setNewAnexo({url: "", extensao: "", nome: "", descricao: ""})

    }
    const toggleModalUpload = () =>{
        setModalUpload(!modalUpload)
    }
    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Editar produto" breadcrumbItem="Produto" />
                        <CarregarArquivo modal={modalUpload} toggle={toggleModalUpload} f_func={updateUrldoAnexo} />

                        <Row>
                            <Col xs="12">
                                <AvForm  onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>
                                    <Card>
                                        <CardBody>

                                            <CardTitle>Informações básicas</CardTitle>
                                            <CardSubtitle className="mb-3">Preencha todas as informações</CardSubtitle>
                                            <Row>
                                                <Col sm="3">
                                                <div className="fileinput  text-center">

                                                    <input type="file" onChange={salvarToStorage} accept="image/*"/>
                                                    <div className="align-items-center d-flex justify-content-center position-relative thumbnail" style={{backgroundImage: `url(${image.url})`}}>
                                                        {carregandoFoto && <Spinner />}
                                                    </div>
                                                    <div><Button type="button" className="btn-round btn btn-secondary">Selecione a foto</Button></div>
                                                </div>
                                                </Col>
                                                <Col sm="9">
                                                    <Row>
                                                        <Col sm="3">
                                                        <AvField name="nome" label="Nome" type="text" value={produto.nome} errorMessage="Campo obrigatório" validate={{
                                                            required: {value: true, errorMessage: 'Campo obrigatório'},
                                                        }} />

                                                        </Col>
                                                        <Col sm="3">
                                                            <AvField name="fabricante" label="Fabricante"  value={produto.fabricante} type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>

                                                        <Col sm="3">
                                                            <AvField name="categoria" label="categoria" value={produto.categoria} type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />

                                                        </Col>
                                                        <Col sm="3">
                                                            <AvField name="informacaoAdicional" label="Informação adicional" value={produto.informacaoAdicional} type="text" errorMessage="Campo obrigatório"  />
                                                        </Col>
                                                        <Col sm="12">
                                                            <AvField name="descricao" label="Descrição" type="textarea" value={produto.descricao} errorMessage="Campo obrigatório" validate={{
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
                                                        <Input name="nameAnexo" type="text"  placeholder="Um nome para o anexo" value={newAnexo.nome}  onChange={changeNewAnexoName} className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="4">
                                                    <FormGroup>
                                                    <InputGroup>
                                                            <Input name="price" type="text" onChange={changeNewAnexoURL} value={newAnexo.url} placeholder="www.enderecodoarquivo.com" className="form-control" />
                                                            <InputGroupAddon onClick={toggleModalUpload} addonType="prepend">Subir</InputGroupAddon>

                                                        </InputGroup>                                                    </FormGroup>
                                                </Col>
                                                <Col sm='2'>
                                                    <FormGroup>
                                                        <Button onClick={saveNewAnexo} type="text" className="form-control" >Novo anexo</Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="12">
                                                    <Anexos  anexos={anexos} removerAnexo={removerAnexo}/>
                                                </Col>
                                                <Col>                                
                                            <Button type="submit" disabled={loading} color="primary" className="mr-1 waves-effect waves-light">{loading ? "Carregando" : "Salvar"}</Button>
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
        
export default EditarProduto;