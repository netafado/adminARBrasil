import React from 'react';
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";

const LatestTranaction = (props) => {
            const  transactions = [
                
            ]; 
          return (
              <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">
                            <div className="d-flex">
                                <h4 style={{flex: 1}}>Últimos chamados</h4>
                                <div className="text-sm-right">
                                    <Button type="button" className="btn-rounded waves-effect waves-light mb-2 mr-2 btn btn-success"  disabled={true}>
                                    <i className="mdi mdi-plus mr-1"></i> novo Chamado
                                    </Button>
                                </div>
                            </div>


                        </CardTitle>

                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap mb-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th># ID</th>
                                        <th>Empresa</th>
                                        <th>Data</th>
                                        <th>Responsável</th>
                                        <th>Status</th>
                                        <th>Técnico</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transactions.map((transaction, key) =>
                                            <tr key={"_tr_" + key}>
                                                <td><Link to="#" className="text-body font-weight-bold"> {transaction.orderId} </Link> </td>
                                                <td>{transaction.billingName}</td>
                                                <td>
                                                    {transaction.Date}
                                                </td>
                                                <td>
                                                    {transaction.total}
                                                </td>
                                                <td>
                                                    <Badge className={"font-size-12 badge-soft-" + transaction.badgeClass} color={transaction.badgeClass} pill>{transaction.paymentStatus}</Badge>
                                                </td>
                                                <td>
                                                    <Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">
                                                        View Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2">Oba! nenhum chamado pendente!</p>
                    </CardBody>
                </Card>
            </React.Fragment>
          );
        }

export default LatestTranaction;