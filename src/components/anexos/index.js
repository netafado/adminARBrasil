import React from "react"
import {Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
const icone = (tipo) => {
    switch (tipo) {
        case "pdf":
            return "bx bxs-file-pdf"
        case "word":
            return "bx bx-text"
        case "power-point":
            return "bx bx-slideshow"
        case "url":
            return "bx bx-world"
        case "imagem":
            return "bx bx-images"
        default:
            return "bx bx-file";
    }
}
const Anexos  = ({anexos, removerAnexo}) =>{

    return(
        <Table className="project-list-table table-nowrap table-centered table-border" > 

        <tbody>
            {anexos.map( ((anexo, i) => {
                return(
                    <tr key={i}>
                        <td width={62}>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center d-flex">
                                <span className="avatar-title rounded-circle">
                                    <i className={`bx ${icone(anexo.extensao)} font-size-24`}></i>
                                </span>


                            </div>
                        </td>
                        <td width={100}>
                            <h5 className="text-truncate font-size-14 text-dark">{anexo.nome}</h5>
                            <h5 className="font-size-12 text-black-50 text-dark text-truncate">{anexo.url}</h5>

                        </td>
                        <td className="text-right" width={30}>
                            <UncontrolledDropdown>
                                <DropdownToggle href="#" className="card-drop" tag="i">
                                    <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={()=>removerAnexo(i)}>Deletar</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                </tr>
                )
            }) )}

        </tbody>
    </Table>
    )
}

export default Anexos