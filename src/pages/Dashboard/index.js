import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, CardBody,  Modal, ModalHeader, ModalBody, ModalFooter, Media, Table } from "reactstrap";
import { Link } from "react-router-dom";


// Pages Components
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

 const Dashboard = (props) => {

     const [modal, setmodal] = useState(false);

          const reports = [
                { title: "Em aberto", iconClass: "bx-copy-alt", description: "0" },
                { title: "Em andamento", iconClass: "bx bx-briefcase-alt", description: "0" },
                { title: "Fechado sem solução", iconClass: "bx bx-bomb", description: "0" },
                { title: "Resolvidos", iconClass: "bx bx-check-double", description: "0" }
            ];


          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Central do cliente')} />

                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        reports.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>



                        <Row>
                            <Col lg="12">
                                <LatestTranaction />
                            </Col>
                        </Row>
                    </Container>
                </div>

            </React.Fragment>
          );
        }

export default withNamespaces()(Dashboard);