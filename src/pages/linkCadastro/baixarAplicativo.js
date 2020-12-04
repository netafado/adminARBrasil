import React  from 'react';

import { Row, Col, CardTitle } from "reactstrap"
const BaixarAplicatico = ({user}) =>{
    return(
        <Row className="justify-content-center">
        <Col sm="12">
        <CardTitle className="mb-4 text-cnter">Baixe o aplicativo e comece a usar:</CardTitle>

        </Col>
        <Col sm="4">
            <div>
                <div className="font-size-24 text-primary mb-2">
                    <i className="fab fa-google"></i>
                </div>

                <h5>Google</h5>

            </div>
        </Col>
        <Col sm="4">
            <div className="mt-4 mt-sm-0">
                <div className="font-size-24 text-primary mb-2">
                <i className="fab fa-app-store-ios"></i>
                </div>
                <h5>AppSore</h5>
            </div>
        </Col>
    </Row>
    )
}

export default BaixarAplicatico