import React, { useState } from 'react';
import { Container, Row, Col,  Card, CardBody, CardTitle, CardSubtitle, Button, Input } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

import InputMask from 'react-input-mask';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
//Import Breadcrumb
import Breadcrumbs  from '../../components/Common/Breadcrumb';

import  imageUrls   from "../../assets/images/logoEmpresa.jpg"

import {useSelector, useDispatch} from "react-redux"
import BtnLoader from "../../components/ui/btnLoader"
import { saveNewCliente } from "../../store/clientes/actions"
import { salvarToStorage } from "../../helpers/amplify/storage"

import FileUploader from "../../components/fileUploader"

const AdicionarCliente = (props) => {

    const dispatch = useDispatch();
    const clientes = useSelector(state => state.Clientes)
    const [logo, setLogo] = useState({url:imageUrls, extensao: null, descricao: "", extensao: ""})
    const [carregandoLogo, setCarregandoLogo] = useState(false)
    const mudarImg = async(e) => {
        const file = e.target.files[0]
        setCarregandoLogo(true)
        const urlFile = await salvarToStorage(file)
        setCarregandoLogo(false)
        setLogo({...logo, url: urlFile})

    }

    const handleValidSubmit = async(e, values) =>{
        values.logo = logo;
        values.pk_produto = null;
        await dispatch(saveNewCliente(values, props.history))
        return toastr.success("Cliente adicionado!", "Cliente salvo com sucesso!")
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
                                        <CardSubtitle className="mb-3">Preencha todos os campos abaixo</CardSubtitle>
                                        <AvForm  onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}>
                                            <Row>
                                                <Col sm={3}>
                                                    <FileUploader salvarToStorage={mudarImg} url={logo.url} textoBtn="Selecione o logo" carregandoFoto={carregandoLogo}/>
                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="razaoSocial" label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="6">
                                                            <AvField
                                                                mask="99.999.999/9999-99"
                                                                tag={[Input, InputMask]} 
                                                                name="cnpj" label="CNPJ" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="telefone"           
                                                                mask="(99) 999-999999"
                                                                maskChar="-"  tag={[Input, InputMask]} label="Telefone" type="text" 
                                                                errorMessage="Campo obrigatório" validate={{
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
                                                            < AvField 
                                                            mask="99999-999"
                                                            tag={[Input, InputMask]} 
                                                            name="cep" label="CEP" type="text" errorMessage="Campo obrigatório" />
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
                                                        <AvField type="select" name="uf" label="Estados" >
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
                                                    <BtnLoader loading={clientes.loading} />
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