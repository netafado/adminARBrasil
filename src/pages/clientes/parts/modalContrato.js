
import React, {useState} from "react"
import {Modal, Col , FormGroup, Label, Input, Button, Spinner} from "reactstrap"
import { salvarToStorage } from "../../../helpers/amplify/storage"


const ModalContrato = ({modal, toggle, f_func, contratoCliente}) => {
    const [carregandoArquivo, setCarregandoArquivo] = useState(false)
    const [contrato, setContrato] = useState(contratoCliente || {dataInicio: "", dataFim: ""})
    const setDataInicio = (e) =>{
        setContrato({...contrato, dataInicio: e.target.value})
    }
    const setDataFim = (e) =>{
        setContrato({...contrato, dataFim: e.target.value})
    }

    return(
        <Modal
            isOpen={modal}
            toggle={() => { toggle() }}
            centered={true}
            >
            <div className="modal-header">
            <h5 className="modal-title mt-0">Editar contrato</h5>
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
                        <Label htmlFor="productname">Data início</Label>
                        <input className="form-control" onChange={setDataInicio} value={contrato.dataInicio} type="date"  id="example-datetime-local-input" />
                    </FormGroup>
    
                    <FormGroup>
                        <Label htmlFor="manufacturerbrand">Data término</Label>
                        <input className="form-control" type="date" onChange={setDataFim} value={contrato.dataFim}  id="example-datetime-local-input" />
                    </FormGroup>
                    {/* 
                    <FormGroup>
                        <Label htmlFor="price">{ carregandoArquivo ? "Carregando arquivo" : "Anexar o documento" } </Label>
                        {carregandoArquivo ? <Spinner size="sm" className="ml-2"  /> : null}
                        <Input id="price" name="price" onChange={mudarImg} type="file" className="form-control" />
                    </FormGroup>
                    */}
                </Col>
    
            </div>
            <div className="modal-footer">
                <FormGroup>
                    <Button disabled={carregandoArquivo}  onClick={()=> f_func(contrato)} className="form-control" >{carregandoArquivo ? "Carregando" : "Salvar"}</Button>
                </FormGroup>
            </div>
        </Modal>
    )

}

export default ModalContrato