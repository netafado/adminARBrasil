import React, { useState } from 'react';
import { Container, Row, Col,  Card, CardBody, CardTitle, CardSubtitle, Input, Alert, FormGroup, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import  imageUrls from "../../assets/images/users/avatar-1.jpg"
import InputMask from 'react-input-mask';
//redux
import { addTecnico } from "../../store/tecnicos/actions"
import { salvarToStorage } from "../../helpers/amplify/storage"
import BtnLoader from "../../components/ui/btnLoader"

import FileUploader from "../../components/fileUploader"
import { useDispatch, useSelector } from 'react-redux';

const AdicionarCliente = (props) => {

    const dispatch = useDispatch();
    const [foto, setFoto] = useState({url:imageUrls, descricao: "", extensao: ""})
    const [carregandoLogo, setCarregandoLogo] = useState(false)
    const {loading, erroNewTecnico}  = useSelector(state => state.Tecnicos)

    // habilidades
    const [habilidade, setHabilidade] = useState("")
    const [habilidades, setHabilidades] = useState([]);
    const mudarImg = async(e) => {
        const file = e.target.files[0]
        setCarregandoLogo(true)
        const urlFile = await salvarToStorage(file)
        console.log(urlFile)
        setCarregandoLogo(false)
        setFoto({...foto, url: urlFile})
    }

    const hanfleHabilidade = (e) =>{
        setHabilidade(e.target.value)
    }

    const deletarHabildade = (i) =>{
        let newArray = [...habilidades]
        newArray.splice(i, 1)
        setHabilidades(newArray)
    }


    const adicionadoHabibildade = (e) =>{
        e.preventDefault()
        if(!habilidade)
            return toastr.error("Erro ao adicionar habilidade", "campo habilidade esta vazio.")
        setHabilidades([...habilidades, habilidade])
        toastr.success("Habilidade adicionada", "")
        setHabilidade("")
    }
    const handleValidSubmit = async(e, values) =>{
        values.foto = foto;
        values.habilidades = habilidades
        const result  = await dispatch(addTecnico(values, props.history))
        console.log(result)
        if(!erroNewTecnico)
            return toastr.success("Técnico adicionado!", "Cliente salvo com sucesso!")
    }



    return (
             <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumbs title=" Técnico" breadcrumbItem="adicionar Técnico" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    {erroNewTecnico ? <Alert color="danger"> {erroNewTecnico} </Alert > : null}
                                    <CardBody>
                                        <CardTitle>Informações</CardTitle>
                                        <CardSubtitle className="mb-3">Preencha todos os campos abaixo</CardSubtitle>
                                        <AvForm  onValidSubmit={(e,v) => { handleValidSubmit(e,v) }} >
                                            <Row>
                                                <Col sm={3}>
                                                 <   FileUploader salvarToStorage={mudarImg} url={foto.url} textoBtn="Selecione o foto" carregandoFoto={carregandoLogo}/>

                                                </Col>
                                                <Col>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="nome" label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                        <Col sm="6">
                                                            <AvField name="cpf" 
                                                                mask="999.999.999-99"
                                                                tag={[Input, InputMask]} 
                                                                label="CPF" type="text" errorMessage="Campo obrigatório" validate={{
                                                                required: {value: true, errorMessage: 'Campo obrigatório'},
                                                            }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="6">
                                                            <AvField name="telefone" 
                                                                mask="(99) 999-999999"
                                                                maskChar="-"  tag={[Input, InputMask]} 
                                                                label="Telefone" type="text" errorMessage="Campo obrigatório" validate={{
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
                                            <hr />
                                            
                                            <Row>
                                                <Col xs="12 mb-4">
                                                    <CardTitle>Veículo</CardTitle>
                                                </Col>
                                                <Col sm={6}>
                                                    <AvField name="veiculo" label="Veículo" placeholder="ex: Hb20 - Hyundai ou Moto CB 650R" type="text" errorMessage="Campo obrigatório" />

                                                </Col>
                                                <Col sm={6}>
                                                    <AvField name="placa" label="placa" type="text" errorMessage="Campo obrigatório" />   
                                                </Col>
                                                <Col sm={12}>
                                                    <AvField type="select" name="cor" label="Cor" >
                                                            <option>Cor</option>
                                                            <option>Preto</option>
                                                            <option>Branco</option>
                                                            <option>Vermelho</option>
                                                            <option>Azul</option>
                                                            <option>Vinho</option>
                                                            <option>Prata</option>
                                                            <option>Cinza</option>
                                                            <option>Verde</option>
                                                            <option>Rosa</option>
                                                            <option>Laranja</option>
                                                            <option>Marrom</option>
                                                        </AvField>
                                                </Col>
                                            </Row>

                                            <hr />
                                            <Row>
                                                <Col xs="12 mb-2">
                                                    <CardTitle>Habilidades</CardTitle>
                                                </Col>
                                            </Row>
                                            <Row>

                                                <Col sm="8">
                                                    <FormGroup>
                                                        <Input name="habilidade" value={habilidade}  onChange={hanfleHabilidade} type="text"  placeholder="Adicione uma habilidade do técnico" className="form-control" />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="4">
                                                    <FormGroup>
                                                        <Button type="text" onClick={adicionadoHabibildade} className="form-control" >adicionar</Button>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="12">
                                                    {habilidades.map((item, i)=>{
                                                        return (
                                                            <div className="row pb-2 pt-2 border-bottom" key={Math.random()} >
                                                            <Col xs={6} sm={10}>
                                                                <h5 className="font-size-15">{item}</h5>
                                                            </Col>
                                                            <Col sm={2}>
                                                            <ul className="list-inline mb-0 font-size-16 mb-3">
                                                                <li className="list-inline-item text-right float-right">
                                                                    <button className="btn btn-lg text-danger p-1" onClick={()=>deletarHabildade(i)}><i className="bx bxs-trash"></i></button>
                                                                </li>
                                                            </ul>
                                                            </Col>
                                                    
                                                        </div>

                                                        )

                                                    })}
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