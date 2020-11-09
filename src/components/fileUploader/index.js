import React from "react"
import {Button, Spinner} from "reactstrap"


const FileUploader = ({salvarToStorage, carregandoFoto, textoBtn, url})=>(
    <div className="fileinput text-center">
    <input type="file" onChange={salvarToStorage} accept="image/*"/>
    <div className="align-items-center d-flex avatar-upload justify-content-center position-relative thumbnail" style={{backgroundImage: `url(${url})`}}>
        {carregandoFoto && <Spinner />}
    </div>
    <div><Button type="button" className="btn-round btn btn-secondary">{textoBtn}</Button></div>
</div>
)

export default FileUploader