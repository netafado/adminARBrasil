import React from 'react';

import { Container, Row, Col, Input, Button } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Cards
import CardProject from "./card-project";

//Import Image
import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import { LineUtil } from 'leaflet';
import { Link } from 'react-router-dom';

const ProjectsGrid  = (props) => {
  
    const  projects = [
                {
                    id: 1, img: img1, name: "New admin Design", description: "It will be as simple as Occidental", status: "Completed", color: "primary", date: "15 Oct, 19", comments: 214,
                    child: [
                        { id: 1, img: avatar2, name: "Daniel Candles", tel: "(11) 98893 7856" },
                    ]
                },
                {
                    id: 2, img: img2, name: "Brand logo design", description: "To achieve it would be necessary", status: "Pending", color: "warning", date: "22 Oct, 19", comments: 183,
                    child: [
                        { id: 1, img: avatar3, name: "Kenneth Johnson", tel: "(11) 98893 7856" },
                    ]
                },
                {
                    id: 3, img: img3, name: "New Landing Design", description: "For science, music, sport, etc", status: "Delay", color: "danger", date: "13 Oct, 19", comments: 175,
                    child: [
                        { id: 1, img: avatar2, name: "Kenneth Johnson", tel: "(11) 98893 7856" },
                    ]
                },
                {
                    id: 4, img: img4, name: "Redesign - Landing page", description: "Rua das Nações - Baruero", status: "Completed", color: "primary", date: "14 Oct, 19", comments: 202,
                    child: [
                        { id: 1, img: avatar3, name: "Paul Miller", tel: "(11) 98893 7856" }
                    ]
                },
                {
                    id: 5, img: img5, name: "Skote Dashboard UI", description: "Separate existence is a myth", status: "Completed", color: "primary", date: "13 Oct, 19", comments: 194,
                    child: [
                        { id: 1, img: avatar3, name: "Steven Jenkins" },
                    ]
                },
                {
                    id: 6, img: img6, name: "Blog Template UI", description: "For science, music, sport, etc", status: "Pending", color: "warning", date: "24 Oct, 19", comments: 222,
                    child: [
                        { id: 1, img: "Null", name: "Ken Dorsy", color: "danger", tel: "(11) 98893 7856" },
                    ]
                },
                {
                    id: 7, img: img2, name: "Multipurpose Landing", description: "It will be as simple as Occidental", status: "Delay", color: "danger", date: "01 Oct, 19", comments: 214,
                    child: [
                        { id: 1, img: avatar1, name: "Partica Harrison", tel: "(11) 98893 7856" },
                    ]
                },
                {
                    id: 8, img: img3, name: "App Landing UI", description: "It will be as simple as Occidental", status: "Delay", color: "danger", date: "22 Oct, 19", comments: 185,
                    child: [
                        { id: 1, img: "Null", name: "David Conyears", color: "primary" , tel: "(11) 98893 7856"},
                    ]
                },
                {
                    id: 9, img: img5, name: "New admin Design", description: "It will be as simple as Occidental", status: "Completed", color: "primary", date: "14 Oct, 19", comments: 106,
                    child: [
                        { id: 1, img: avatar3, name: "Nataile Salerino", tel: "(11) 98893 7856" },
                    ]
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