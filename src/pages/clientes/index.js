import React, {useEffect} from 'react';

import { Container, Row, Col, Input, Button } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {useDispatch, useSelector} from "react-redux"
import {listarClientes} from "../../store/clientes/actions"
//Import Cards
import CardProject from "./card-project";

 
//Import Image
import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";
import { Link } from 'react-router-dom';

const ProjectsGrid  = (props) => {
    const dispatch = useDispatch()
    const clientes = useSelector(state => state.Clientes.clientes)
    console.log(clientes)
    useEffect(()=>{
        dispatch(listarClientes())
    }, [])
  
    const  projects = [
                {
                    id: 1, img: img1, name: "New admin Design", description: "It will be as simple as Occidental", status: "Completed", color: "primary", date: "15 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 214,

                },
                {
                    id: 2, img: img2, name: "Brand logo design", description: "To achieve it would be necessary", status: "Pending", color: "warning", date: "22 Oct, 19", contrato_data: "22/05/20", contrato: false,comments: 183,
                },
                {
                    id: 3, img: img3, name: "New Landing Design", description: "For science, music, sport, etc", status: "Delay", color: "danger", date: "13 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 175,

                },
                {
                    id: 4, img: img4, name: "Redesign - Landing page", description: "Rua das Nações - Baruero", status: "Completed", color: "primary", date: "14 Oct, 19", contrato_data: "22/05/20", contrato: false,comments: 202,

                },
                {
                    id: 5, img: img5, name: "Skote Dashboard UI", description: "Separate existence is a myth", status: "Completed", color: "primary", date: "13 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 194,

                },
                {
                    id: 6, img: img6, name: "Blog Template UI", description: "For science, music, sport, etc", status: "Pending", color: "warning", date: "24 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 222,
                },
                {
                    id: 7, img: img2, name: "Multipurpose Landing", description: "It will be as simple as Occidental", status: "Delay", color: "danger", date: "01 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 214,
                },
                {
                    id: 8, img: img3, name: "App Landing UI", description: "It will be as simple as Occidental", status: "Delay", color: "danger", date: "22 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 185,

                },
                {
                    id: 9, img: img5, name: "New admin Design", description: "It will be as simple as Occidental", status: "Completed", color: "primary", date: "14 Oct, 19", contrato_data: "22/05/20", contrato: true,comments: 106,

                }
            ];

    return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Clientes" breadcrumbItem="Lista de clientes" />
                        <Row className="mb-2">
                            <Col sm="4">
                                <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <Input type="text" className="form-control" placeholder="Procurar..." />
                                        <i className="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="8">
                                <div className="text-sm-right">
                                    <Button to="/clientes-adicionar" tag={Link} type="button" color="success" className="btn-rounded waves-effect waves-light mb-2 mr-2"><i className="mdi mdi-plus mr-1"></i> novo Cliente</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {/* Import Cards */}

                            <CardProject projects={projects} />
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default ProjectsGrid;