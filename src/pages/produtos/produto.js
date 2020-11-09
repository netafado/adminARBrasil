import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input, Card, CardBody, CardTitle, CardSubtitle, Button,  Spinner } from "reactstrap";
import Select from 'react-select';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// store 
import {saveNewProduct} from "../../store/product/actions"
import { Storage } from "aws-amplify"
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import  imageUrls from "../../assets/images/logoEmpresa.jpg"
import { useDispatch, useSelector } from 'react-redux';
import config from "../../aws-exports"
import Anexos from "../../components/anexos"
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
    { value: 'outro', label: 'Outro' },
]

const EditarProduto = (props) => {

    const [anexos, setAnexos]                   = useState([]);
    const [carregandoFoto, setCarregandoFoto]   = useState(false)
    const [newAnexo, setNewAnexo]               = useState({url: "", extensao: "", nome: "", descricao: ""})
    const [image, setImage]                     = useState({url:imageUrls, extensao: null, descricao: "", extensao: ""})
    const loading                               = useSelector(state => state.Products.loading)
    const dispatch                              = useDispatch();
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
        await dispatch(saveNewProduct(values, props.history))
        return toastr.success("Novo Produto", "Produto salvo com sucesso!")
    }

    const changeNewAnexoURL = (e) =>{
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
                                                        <AvField name="nome" label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
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
                                                            <AvField name="informacaoAdicional" label="Informação adicional" type="text" errorMessage="Campo obrigatório" validate={{
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
                                                        <Input name="nameAnexo" type="text"  placeholder="Um nome para o anexo" value={newAnexo.nome}  onChange={changeNewAnexoName} className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="4">
                                                    <FormGroup>
                                                        <Input name="price" type="text" onChange={changeNewAnexoURL} value={newAnexo.url} placeholder="www.enderecodoarquivo.com" className="form-control" />
                                                    </FormGroup>
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