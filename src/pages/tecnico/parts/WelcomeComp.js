import React from 'react';

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";

const WelcomeComp = (props) => {
    console.log(props.user)
    const {user}  = props
    if(!user) return null
          return (
           <React.Fragment>
                <Card >
                    <CardBody >
                        <Row>
                            <Col sm="12">
                                <div className="avatar-md profile-user-wid mb-4 text-center m-auto">
                                    <img src={user.foto ? user.foto.url : avatar1} alt="" className="img-thumbnail rounded-circle m-auto" />
                                </div>
                                    <h5 className="font-size-15 text-truncate text-center">{user.nome}</h5>
                                    <p className="text-muted mb-0 text-truncate text-center" >CPF{user.cpf} </p>
                            </Col>

                            <Col sm="12">
                                <div className="pt-4">

                                            <h5 className="text-muted mb-0 text-center">telefone: {user.telefone || "---"}</h5>
                                            <p className="text-muted mb-0 text-center">Endereço : rua {user.rua || "---"}, {user.bairro}</p>
                                            <p className="text-muted mb-0 text-center">Cidade : {user.rua || "---"}, ${user.bairro} | Estado {user.uf}</p>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
          );
        }
export default WelcomeComp;
 