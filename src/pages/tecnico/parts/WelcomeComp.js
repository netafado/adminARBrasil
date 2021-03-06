import React from 'react';

import { Row, Col, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";

const WelcomeComp = (props) => {
    const {user}  = props
    if(!user) return null

    console.log(user)
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
                                    <p className="text-muted mb-0 text-truncate text-center" >CPF: {user.cpf} </p>
                            </Col>

                            <Col sm="12">
                                <div className="pt-4">

                                    <h5 className="text-muted mb-0 text-center">telefone: {user.telefone || "---"}</h5>
                                    <p className="text-muted mb-0 text-center">Rua : {user.rua || "---"} | cidade : {user.cidade || "---"} | Bairro: {user.bairro}  | Estado: {user.uf} </p>
                                    <p className="text-muted mb-0 text-center">Veiculo : {user.veiculo || "---"}, placa: {user.placa} | cor {user.cor}</p>

                                </div>
                                <div className="pt-4">
                                <hr />
                                <h5 className="text-muted mb-0 text-center">Lista de habilidades</h5>

                                <ListGroup>
                                    {user.habilidades ?
                                        user.habilidades.map( (habilidade)=> <ListGroupItem className="text-center" key={Math.random()}>{habilidade}</ListGroupItem> )
                                    : null}
                                </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
          );
        }
export default WelcomeComp;
 