import React, {useState, useEffect} from 'react';


import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Button, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Spinner } from "reactstrap";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import ModalContrato                from "./parts/modalContrato"
import { API, graphqlOperation  }   from "aws-amplify"
import * as mutations               from "../../graphql/mutations"
import TableProdutos                from "./parts/produtosTable"
import {useSelector, useDispatch}   from "react-redux"
import {getCliente}                 from "../../store/cliente/actions"
import {updateCliente}              from "../../store/clientes/actions"
//Import Breadcrumb
import Breadcrumbs                  from '../../components/Common/Breadcrumb';
//Import Image
import moment                       from "moment"
import {listarProdutos}             from "../../store/listaProdutos/actions"


import ModalCliente from "./parts/modalClientes"
import ModalProduto from "./parts/modalProdutos"
import ModalClienteEdit from "./parts/modalClienteEditar"

const ClienteSingle = (props) => {
    const [modalContrato, setmodalContrato]     = useState(false);
    const [modalProdutos, setModalProdutos]     = useState(false)
    const [modal_membro, setmodal_membro]       = useState(false);
    const [atualiazando, setAtualizando]        = useState(false)
    const [modal_membroEdit, setmodal_membroEdit]       = useState(false);
    const [userEdit, setUserEdit]                       = useState({})

    const {produtcts}                           = useSelector(state => state.ProdutosLista)
    const {cliente, loading}                    = useSelector(state => state.Cliente)
    const [membros, setMembros]                 = useState([])
    const [produtosDoCLiente, setprodutosDoCLiente]  = useState([])
    const dispatch = useDispatch()
    //abrir modal com Produtos
    // o modal precisa de 2 campos um select e textarea
    const loadInfo = async () =>{
        dispatch(listarProdutos())
        const a = await dispatch( getCliente(props.location.hash)  )

    }

    useEffect(()=>{
        if(!cliente)
            return
        setMembros(cliente.membros)
        atualizarProdutosClientes()

        
    }, [cliente])

    const atualizarProdutosClientes = () => {
        let {produto , pk_produto} = cliente
        const newArray = produto.map( (item) =>{
            let newItem = item
            let setups  = pk_produto.filter( (pk_p) => item.pk === pk_p.pk_produto  )
            newItem.set = setups
            return newItem
        } )
        setprodutosDoCLiente(newArray)
        
    }

    const updateContrato = async(contrato) =>{
        // update contrato
        console.log(contrato)
        setAtualizando(true)
        let input = {
            pk: cliente.pk,
            razaoSocial: cliente.razaoSocial,
            cnpj: cliente.cnpj,
            telefone: cliente.telefone,
            email: cliente.email,
            cep: cliente.cep,
            rua: cliente.rua,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            uf: cliente.uf,
            logo: cliente.logo,
            pk_produto: cliente.pk_produto ? cliente.pk_produto : [{pk_produto: " ", setup: " "}],
            dataInicioContrato: contrato.dataInicio,
            dataFimContrato: contrato.dataFim

        }
        setAtualizando(false)

        API.graphql(graphqlOperation( mutations.updateCliente, {input} ))
        .then( (data) => {
            loadInfo();
            toggleModalContrato()
            toastr.success("", "Contrato atualizado com sucesso.")
        } )
        .catch( err => console.log(err) )
    }

    const adcionarProdutoComSetUp = async(e, v) =>{
        cliente.pk_produto = [...cliente.pk_produto, {pk_produto: v.pk, setup: v.setup, devolucao: v.devolucao}]
        await dispatch(updateCliente({...cliente}, null))
        toggleModalProduto()
        loadInfo();
    }

    const adicionarUser = async(e,v, foto) =>{
        const input = {
            pk_cliente: cliente.pk,
            nome: v.nome,
            cpf: v.cpf,
            telefone: v.telefone,
            email: v.email,
            cep: v.cep,
            rua: v.rua,
            bairro: v.bairro,
            cidade: v.cidade,
            uf: v.uf,
            foto: foto,
            tipo: "C",
            cargo_funcao: v.cargo_funcao,
            master: v.marter
        }
        await API.graphql(graphqlOperation( mutations.createUsuario, {input} ))
        .then( (result) => {
            setMembros([...membros, result.data.createUsuario])
            toastr.success("", "Novo usuário adicionado.")
        } )
        .catch( err => {
            console.log(err, "teste")
            toastr.error("", "CPF já cadastrado na base de dados")
        })

        tog_membro()
    }


    const deletarProduto = async( pk ) => {
        const novoProdutoPK = cliente.pk_produto.filter((item)=>{
            return item.pk_produto !== pk
        })
        console.log(novoProdutoPK, pk)
        setAtualizando(true)
        let input = {
            pk: cliente.pk,
            razaoSocial: cliente.razaoSocial,
            cnpj: cliente.cnpj,
            telefone: cliente.telefone,
            email: cliente.email,
            cep: cliente.cep,
            rua: cliente.rua,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            uf: cliente.uf,
            logo: cliente.logo,
            pk_produto: novoProdutoPK ? novoProdutoPK : [{pk_produto: " ", setup: " "}],
            contrato: cliente.contrato

        }
        setAtualizando(false)

        API.graphql(graphqlOperation( mutations.updateCliente, {input} ))
        .then( (data) => {
            loadInfo();
            toastr.success("", "Produto deletado.")
        } )
        .catch( err => console.log(err) )
    }

    const updateUser = async(e,v, foto, user) =>{
        const input = {
            pk: user.pk,
            pk_cliente: cliente.pk,
            nome: v.nome,
            cpf: v.cpf,
            telefone: v.telefone,
            email: v.email,
            cep: v.cep,
            rua: v.rua,
            bairro: v.bairro,
            cidade: v.cidade,
            uf: v.uf,
            foto: foto,
            tipo: "C",
            cargo_funcao: v.cargo_funcao,
            master: v.marter
        }
        API.graphql(graphqlOperation( mutations.updateUsuario, {input} ))
        .then( (result) => {
            loadInfo()
        } )
        .catch( err => {
            console.log(err, "teste")
        })

        toggleModalClienteEdit()
    }

    const deletarUser = async(pk) =>{
       await API.graphql(graphqlOperation( mutations.deleteUsuario, {pk} ))
        .then( (result) => {
            console.log(result)
        } )
        .catch( err => {
            console.log(err, "teste")
        })
        loadInfo()

    }
    const toggleModalProduto = () => {
        setModalProdutos(!modalProdutos)
    }
    const toggleModalClienteEdit = () => {
        setmodal_membroEdit(!modal_membroEdit)
    }
    useEffect(()=>{
        loadInfo()
    }, [])

    const editarCliente = () => {
        props.history.push({
            pathname: "/clientes-editar",
            state: {cliente}
        })
    }

    const setarUserEdit = (user) =>{
        setUserEdit(user)
        toggleModalClienteEdit( true )
    }



    function toggleModalContrato() {
        setmodalContrato(!modalContrato);
        //removeBodyCss();
    }

        function tog_membro() {
        setmodal_membro(!modal_membro);
        //removeBodyCss();
        }
        if(!cliente) return null

    return (
             <React.Fragment>
                <ModalCliente modal={modal_membro} toggle={tog_membro} enviarClienteNovo={adicionarUser} />
                <ModalProduto modal={modalProdutos} toggle={toggleModalProduto}  enviarNovoProduto={adcionarProdutoComSetUp} />
                <ModalContrato modal={modalContrato} toggle={toggleModalContrato} f_func={updateContrato} contratoCliente={cliente.contrato}/>
                <ModalClienteEdit modal={modal_membroEdit} toggle={toggleModalClienteEdit} enviarClienteNovo={updateUser} user={userEdit}/>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title={<> Cliente {(loading || atualiazando) ? <Spinner size="sm"/> : null} </>} breadcrumbItem="Ver cliente" />

                        <Row>
                            <Col lg="12">
                                <Card>

                                    <CardBody>
                                        <Media>
                                            {
                                            !cliente.logo ?
                                                <div className="avatar-sm mb-2 mr-2">
                                                    <span className={"avatar-title rounded-circle font-size-16"}>
                                                        {cliente.razaoSocial.charAt(0)}
                                                    </span>
                                                </div>
                                                :
                                                <div className="mb-3 mr-3 avatar-md">
                                                     <span className="avatar-title rounded-circle bg-light text-danger font-size-16" style={{backgroundImage: `url( ${cliente.logo.url} )`}}>
                                                    </span>
                                                </div>
                                            }
                                            <Media className="overflow-hidden" body>
                                                <h5 className="text-truncate font-size-15 mt-1">{cliente.razaoSocial}</h5>
                                                <p className="text-muted">CPNJ: {cliente.cnpj || "---"}</p>
                                            </Media>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle href="#" className="card-drop" tag="i">
                                                        <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem onClick={toggleModalContrato}><i className="mdi mdi-clipboard-list font-size-16 text-info mr-2"></i>Editar contrato</DropdownItem>
                                                        <DropdownItem onClick={editarCliente} to="/clientes-adicionar"><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                </div>
                                        </Media>

                                        <h5 className="font-size-15 mt-4">Informações :</h5>

                                        <div className="text-muted mt-4">
                                            <p><i className="mdi mdi-chevron-right text-primary mr-1"></i>{cliente.rua} - {cliente.cidade} | {cliente.uf}, CEP: {cliente.cep || "---"}.</p>
                                            <p><i className="mdi mdi-chevron-right text-primary mr-1"></i> Telefone: {cliente.telefone}</p>
                                        </div>
                                        <hr className="mt-2"/>
                                        <h5 className="font-size-15 mt-4">Contrato :</h5>
                                        <Row >
                                                <Col sm="6" xs="6">
                                                    <div className="mt-2">
                                                        <h5 className="font-size-14"><i className="bx bx-calendar mr-1 text-primary"></i> Início</h5>
                                                    <p className="text-muted mb-0">{ moment(cliente.dataInicioContrato).format("DD/MM/YYYY")}</p>
                                                    </div>
                                                </Col>

                                                <Col sm="6" xs="6">
                                                    <div className="mt-2">
                                                        <h5 className="font-size-14"><i className="bx bx-calendar-check mr-1 text-primary"></i> Fim</h5>
                                                        <p className="text-muted mb-0">{moment(cliente.dataFimContrato).format("DD/MM/YYYY")}</p>
                                                    </div>
                                                </Col>

                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Membros
                                        <Button  onClick={tog_membro}   color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2 float-right">
                                            <i className="mdi mdi-plus mr-1"></i> novo membro
                                        </Button>

                                        </CardTitle>

                                        <div className="table-responsive mb-3" style={{overflow: "visible"}}>
                                            {membros.length <= 0 ? <Col><p>Nenhum cadastro.</p></Col> : null }
                                            <Table>
                                                <tbody>
                                                    {
                                                        membros.map((member, k) =>
                                                            <tr key={"_member_" + k} >
                                                                <td style={{ width: "50px" }}>
                                                                    {
                                                                        member.foto
                                                                            ? <img src={member.foto.url} className="rounded-circle avatar-xs" alt="" />
                                                                            : <span className="avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                                                                                    {member.nome.charAt(0)}
                                                                                </span>
                                                                            </span>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <h5 className="font-size-14 m-0">{member.nome}</h5>
                                                                    <p className=" m-0 text-muted">{member.cargo_funcao}</p>
                                                                    </td>
                                                                <td>
                                                                    <div>
                                                                        <button disabled={true} type="button" className="btn btn-success btn-small waves-effect waves-light float-right"><i className="bx bx bx-paper-plane font-size-16 align-middle mr-2"></i> Convidar Aplicativo
                                                                        </button >
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                    <UncontrolledDropdown className="float-right">
                                                                        <DropdownToggle href="#" className="card-drop" tag="i">
                                                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu right>
                                                                            <DropdownItem onClick={()=> setarUserEdit(member)}><i className="mdi mdi-pencil font-size-16 text-success mr-2"></i>Editar</DropdownItem>
                                                                            <DropdownItem onClick={()=> deletarUser(member.pk)}><i className="mdi mdi-trash-can font-size-16 text-danger mr-2"></i>Deletar</DropdownItem>
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
                                            <Button  type="button" color="success" onClick={toggleModalProduto} className="btn-rounded waves-effect waves-light mb-2 mr-2 float-right">
                                            <i className="mdi mdi-plus mr-1"></i> Produto</Button>
                                        </CardTitle>
                                        <TableProdutos deletarProduto={deletarProduto} produtos={produtosDoCLiente} adcionarProdutoComSetUp={adcionarProdutoComSetUp} />

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