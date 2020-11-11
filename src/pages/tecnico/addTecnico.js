import React, { useState } from 'react';
import { Container, Row, Col,  Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import  imageUrls from "../../assets/images/users/avatar-1.jpg"

//redux
import { addTecnico } from "../../store/tecnicos/actions"
import { salvarToStorage } from "../../helpers/amplify/storage"
import BtnLoader from "../../components/ui/btnLoader"

import FileUploader from "../../components/fileUploader"
import { useDispatch, useSelector } from 'react-redux';

const AdicionarCliente = (props) => {

    const dispatch = useDispatch();
    const [foto, setFoto] = useState({url:imageUrls, extensao: null, descricao: "", extensao: ""})
    const [carregandoLogo, setCarregandoLogo] = useState(false)
    const {loading}  = useSelector(state => state.Tecnicos)
    const mudarImg = async(e) => {
        const file = e.target.files[0]
        setCarregandoLogo(true)
        const urlFile = await salvarToStorage(file)
        console.log(urlFile)
        setCarregandoLogo(false)
        setFoto({...foto, url: urlFile})
    }
    const handleValidSubmit = async(e, values) =>{
        values.foto = foto;
        await dispatch(addTecnico(values, props.history))
        return toastr.success("Técnico adicionado!", "Cliente salvo com sucesso!")
    }
    console.log(loading)
    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumbs title=" Técnico" breadcrumbItem="adicionar Técnico" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Informações</CardTitle>
                                        <CardSubtitle className="mb-3">Preencha todos os campos abaixo</CardSubtitle>
                                        <AvForm  onValidSubmit={(e,v) => { handleValidSubmit(e,v) }} >
                                            <Row>
                                                <Col sm={3}>
                                                <   FileUploader salvarToStorage={mudarImg} url={foto.url} textoBtn="Selecione o logo" carregandoFoto={carregandoLogo}/>

                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="nome" label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="6">
                                                            <AvField name="cpf" label="CPF" type="text" errorMessage="Campo obrigatório" validate={{
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
                                                    <BtnLoader loading={loading} />
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