import React, {useState, useEffect} from 'react';

import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Button, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Modal, FormGroup, Label, Input, Spinner } from "reactstrap";

import {useSelector, useDispatch} from "react-redux"
import {getCliente} from "../../store/cliente/actions"
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
//Import Image
import img1 from "../../assets/images/companies/img-1.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

import ModalCliente from "./modalClientes"

const ClienteSingle = (props) => {
    const [modal_center, setmodal_center] = useState(false);
    const [modal_membro, setmodal_membro] = useState(false);
    const {cliente, loading} = useSelector(state => state.Cliente)
    const dispatch = useDispatch()
    const loadInfo = async () =>{
        const a = await dispatch( getCliente(props.location.hash)  )
    }
    useEffect(()=>{
        loadInfo()
    }, [])
           const members = [
                {
                    id: 1, img: avatar2, name: "Daniel Canales",
                    skills: [
                        { id: 1, name: "Frontend" },
                        { id: 2, name: "UI" },
                    ]
                },
                {
                    id: 2, img: avatar1, name: "Jennifer Walker",
                    skills: [
                        { id: 1, name: "UI/UX" }
                    ]
                },
                {
                    id: 3, img: "Null", name: "Carl Mackay",
                    skills: [
                        { id: 1, name: "Backend" }
                    ]
                },
                {
                    id: 4, img: avatar4, name: "Janice Cole",
                    skills: [
                        { id: 1, name: "Frontend" },
                        { id: 2, name: "UI" },
                    ]
                },
                {
                    id: 5, img: "Null", name: "Tony Brafford",
                    skills: [
                        { id: 1, name: "Backend" }
                    ]
                },
            ];

            function tog_center() {
                setmodal_center(!modal_center);
                //removeBodyCss();
              }

              function tog_membro() {
                setmodal_membro(!modal_membro);
                //removeBodyCss();
              }
              if(!cliente) return null
    return (
             <React.Fragment>
                 <ModalCliente modal={modal_membro} toggle={tog_membro} />


                <Modal
                    isOpen={modal_center}
                    toggle={() => { tog_center() }}
                    centered={true}
                    >
                        <div className="modal-header">
                        <h5 className="modal-title mt-0">Editar contrato</h5>
                        <button
                            type="button"
                            onClick={() => { setmodal_center(false) } }
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
                                    <input className="form-control" type="datetime-local" defaultValue="2019-08-19T13:45:00" id="example-datetime-local-input" />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="manufacturerbrand">Data término</Label>
                                    <input className="form-control" type="datetime-local" defaultValue="2019-08-19T13:45:00" id="example-datetime-local-input" />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="price">Anexar o documento</Label>
                                    <Input id="price" name="price" type="file" className="form-control" />
                                </FormGroup>
                            </Col>

                        </div>
                        <div className="modal-footer">
                            <FormGroup>
                                <Button  className="form-control" >Salvar</Button>
                            </FormGroup>
                        </div>
                    </Modal>
 
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Cliente" breadcrumbItem="Ver cliente" />

                        <Row>
                            <Col lg="12">
                                <Card>
                                    {loading ? <Spinner /> : null}
                                    <CardBody>
                                        <Media>
                                            <img src={cliente.logo.url} alt="" className="avatar-sm mr-4" />

                                            <Media className="overflow-hidden" body>
                                                <h5 className="text-truncate font-size-15">{cliente.razaoSocial}</h5>
                                                <p className="text-muted">{cliente.cnpj}</p>
                                            </Media>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle href="#" className="card-drop" tag="i">
                                                        <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem onClick={tog_center}><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar contrato</DropdownItem>
                                                        <DropdownItem tag={Link} to="/clientes-adicionar"><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                        <DropdownItem href="#"><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                </div>
                                        </Media>

                                        <h5 className="font-size-15 mt-4">Informações :</h5>

                                        <div className="text-muted mt-4">
                                            <p><i className="mdi mdi-chevron-right text-primary mr-1"></i> CPNJ: ---</p>
                                            <p><i className="mdi mdi-chevron-right text-primary mr-1"></i>{cliente.rua} - {cliente.cidade} | {cliente.up} - CEP: {cliente.cep || "---"}.</p>
                                            <p><i className="mdi mdi-chevron-right text-primary mr-1"></i> Telefone: {cliente.telefone}</p>
                                        </div>
                                        <hr className="mt-2"/>
                                        <h5 className="font-size-15 mt-4">Contrato :</h5>
                                        <Row >

                                            <Col sm="6" xs="6">
                                                <div className="mt-2">
                                                    <h5 className="font-size-14"><i className="bx bx-calendar mr-1 text-primary"></i> Início</h5>
                                                    <p className="text-muted mb-0">08 Sept, 2019</p>
                                                </div>
                                            </Col>

                                            <Col sm="6" xs="6">
                                                <div className="mt-2">
                                                    <h5 className="font-size-14"><i className="bx bx-calendar-check mr-1 text-primary"></i> Fim</h5>
                                                    <p className="text-muted mb-0">12 Oct, 2019</p>
                                                </div>
                                            </Col>
                                            <Table className="table table-nowrap table-centered table-hover mb-0 mt-2">
                                                <tbody>
                                                    <tr key={"_file_"} >
                                                        <td style={{ width: "45px" }}>
                                                            <div className="avatar-sm">
                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                                                                    <i className="bx bxs-file-doc"></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td style={{ width: "45px" }}>
                                                            <h5 className="font-size-14 mb-1"><Link to="#" className="text-dark">Contrato</Link></h5>
                                                            <small>Size : 12mb</small>

                                                        </td>
                                                        <td>
                                                            <div className="text-left">
                                                            <Link t className="text-dark"><i className="bx bx-download h3 m-0"></i></Link>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                        
                                                    
                                                </tbody>
                                            </Table>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Membros
                                        <Button  onClick={tog_membro}  color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2 float-right">
                                            <i className="mdi mdi-plus mr-1"></i> novo Cliente
                                        </Button>

                                        </CardTitle>

                                        <div className="table-responsive">
                                            <Table className="table table-centered table-nowrap">
                                                <tbody>
                                                    {
                                                        members.map((member, k) =>
                                                            <tr key={"_member_" + k} >
                                                                <td style={{ width: "50px" }}>
                                                                    {
                                                                        member.img !== "Null"
                                                                            ? <img src={member.img} className="rounded-circle avatar-xs" alt="" />
                                                                            : <div className="avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                                                    {member.name.charAt(0)}
                                                                                </span>
                                                                            </div>
                                                                    }
                                                                </td>
                                                                <td><h5 className="font-size-14 m-0"><Link to="" className="text-dark">{member.name}</Link></h5></td>
                                                                <td>
                                                                    <div>
                                                                        <button type="button" className="btn btn-success btn-small waves-effect waves-light float-right"><i className="bx bx bx-paper-plane font-size-16 align-middle mr-2"></i> Convidar Aplicativo
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                    <UncontrolledDropdown className="float-right">
                                                                        <DropdownToggle href="#" className="card-drop" tag="i">
                                                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu right>
                                                                            <DropdownItem tag={Link} to="/clientes-adicionar"><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                                            <DropdownItem href="#"><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                                                        </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Produtos
                                        <Button  type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2 float-right"><i className="mdi mdi-plus mr-1"></i> Produto</Button>

                                        </CardTitle>

                                        <div className="table-responsive">
                                            <Table className="table table-centered table-nowrap">
                                                <tbody>
                                                    {
                                                        members.map((member, k) =>
                                                            <tr key={"_member_" + k} >
                                                                <td style={{ width: "50px" }}>
                                                                    {
                                                                        member.img !== "Null"
                                                                            ? <img src={member.img} className="rounded-circle avatar-xs" alt="" />
                                                                            : <div className="avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                                                    {member.name.charAt(0)}
                                                                                </span>
                                                                            </div>
                                                                    }
                                                                </td>
                                                                <td><h5 className="font-size-14 m-0"><Link to="" className="text-dark">{member.name}</Link></h5></td>

                                                                <td>
                                                                    <div>
                                                                    <UncontrolledDropdown className="float-right">
                                                                        <DropdownToggle href="#" className="card-drop" tag="i">
                                                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu right>
                                                                            <DropdownItem href="#"><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default ClienteSingle;