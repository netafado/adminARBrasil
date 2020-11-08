import React from 'react';
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";
//import { Link } from "react-router-dom";


// Pages Components
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';
import { useSelector } from 'react-redux';

 const Dashboard = (props) => {
    const {chamados} = useSelector(state => state.InfoGerais)
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
                                        chamados.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.total}</h4>
                                                            </Media>
                                                            <div className={`mini-stat-icon avatar-sm rounded-circle  align-self-center `}>
                                                                <span className={`avatar-title ${report.color}`}>
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