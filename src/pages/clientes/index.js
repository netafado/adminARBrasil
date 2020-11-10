import React, {useEffect} from 'react';

import { Container, Row, Col, Input, Button } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {useDispatch, useSelector} from "react-redux"
import {listarClientes} from "../../store/clientes/actions"
//Import Cards
import CardProject from "./card-project";

 
import { Link } from 'react-router-dom';

const ProjectsGrid  = (props) => {
    const dispatch = useDispatch()
    const {clientes, loading} = useSelector(state => state.Clientes)

    useEffect(()=>{
        dispatch(listarClientes())
    }, [])
    

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
                            <CardProject projects={clientes} />
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
          );
    }
        
export default ProjectsGrid;