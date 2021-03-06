import React, {useState, useEffect} from 'react';

import {  Col, Button, Modal, FormGroup, Row, Input } from "reactstrap";
import InputMask            from 'react-input-mask';
import { AvForm, AvField }  from 'availity-reactstrap-validation';
import  imageUrls           from "../../../assets/images/logoEmpresa.jpg"
import { salvarToStorage }  from "../../../helpers/amplify/storage"
import FileUploader         from "../../../components/fileUploader"


const ModalMembros = ({modal, toggle, enviarClienteNovo, user}) => {

    const [carregandoLogo, setCarregandoLogo] = useState(false)
    const [foto, setFoto] =  useState( user.foto || { url:imageUrls, extensao: null, descricao: "" })
    const mudarImg = async(e) => {
        const file = e.target.files[0]
        setCarregandoLogo(true)
        const urlFile = await salvarToStorage(file)
        setCarregandoLogo(false)
        setFoto({...foto, extensao: file.type, url: urlFile})
    }
    useEffect( ()=>{
        if(user.foto){
            setFoto(user.foto)
        }
    }, [user] )

    return (
             <React.Fragment>

                <Modal
                    size="lg"
                    isOpen={modal}
                    toggle={() => { toggle() }}
                    centered={true}
                >
                    <div className="modal-header">
                    <h5 className="modal-title mt-0">Adicionar membro</h5>
                    <button
                        type="button"
                        onClick={() => { toggle(false) } }
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">

                    <Row>
                    <Col sm={3}>
                        <FileUploader salvarToStorage={mudarImg} url={foto.url} textoBtn="Selecione a foto" carregandoFoto={carregandoLogo} data={foto.extensao}/>
                    </Col>
                        <Col sm={9}>
                        <AvForm  onValidSubmit={(e,v) => { enviarClienteNovo(e,v, foto, user) }}>
                            <Row>
                                <Col sm="12">
                                    <AvField name="nome" value={user.nome} label="Nome" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                                <Col sm="12" className="mb-3 border-bottom">
                                        <AvField name="master"
                                            value={user.master}
                                            label="Master" type="checkbox"  errorMessage="Campo obrigatório" />
                                    </Col>
                                    <Col sm="12">
                                        <AvField name="cargo_funcao" 
                                            value={user.cargo_funcao}
                                            label="cargo / função" type="text" errorMessage="Campo obrigatório" validate={{
                                            required: {value: true, errorMessage: 'Campo obrigatório'},
                                        }} />
                                    </Col>
                                <Col sm="12">
                                    <AvField name="cpf" 
                                        mask="999.999.999-99"
                                        tag={[Input, InputMask]} 
                                        value={user.cpf}
                                        label="CPF" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <AvField name="telefone" 
                                        mask="(99) 999-999999"
                                        maskChar="-"  
                                        tag={[Input, InputMask]}
                                        value={user.telefone}
                                        label="Telefone" type="text" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                    }} />
                                </Col>
                                <Col sm="12">
                                    < AvField name="email" 
                                        value={user.email}
                                        label="Email" type="email" errorMessage="Campo obrigatório" validate={{
                                        required: {value: true, errorMessage: 'Campo obrigatório'},
                                        email: {value: true, errorMessage: "formato do email invalido"}
                                    }} />
                                </Col>
                            </Row>
                            <FormGroup>
                                <Button type="submit"  className="form-control" >Salvar</Button>
                            </FormGroup>
                        </AvForm>
                        </Col>
                    


                </Row>
                    </div>
                    <div className="modal-footer">

                    </div>
                </Modal>
    
            </React.Fragment>
          );
    }
        
export default ModalMembros;