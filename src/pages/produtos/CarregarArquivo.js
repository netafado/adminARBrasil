
import React, {useState} from "react"
import {Modal, Col , FormGroup, Label, Input, Button, Spinner} from "reactstrap"
import { salvarToStorage } from "../../helpers/amplify/storage"


const ModalContrato = ({modal, toggle, f_func,}) => {
    const [carregandoArquivo, setCarregandoArquivo] = useState(false)
    const [url, setUrl] = useState("")

    const mudarImg = async(e) => {
        const file = e.target.files[0]
        setCarregandoArquivo(true)
        const urlFile = await salvarToStorage(file)
        setCarregandoArquivo(false)
        setUrl(urlFile)
    }
    return(
        <Modal
            isOpen={modal}
            toggle={() => { toggle() }}
            centered={true}
            >
            <div className="modal-header">
            <h5 className="modal-title mt-0">Subir arquivo contrato.</h5>
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
    
            <Col sm="12">
                <FormGroup>
                    <Label htmlFor="price">{ carregandoArquivo ? "Carregando arquivo" : "Anexar o documento" } </Label>
                    {carregandoArquivo ? <Spinner size="sm" className="ml-2"  /> : null}
                    <Input id="price" disabled={carregandoArquivo} name="price" onChange={mudarImg} type="file" className="form-control" />
                </FormGroup>
            </Col>
    
            </div>
            <div className="modal-footer">
                <FormGroup>
                    <Button disabled={carregandoArquivo}  onClick={()=> f_func(url)} className="form-control" >{carregandoArquivo ? "Carregando" : "Salvar"}</Button>
                </FormGroup>
            </div>
        </Modal>
    )

}

export default ModalContrato