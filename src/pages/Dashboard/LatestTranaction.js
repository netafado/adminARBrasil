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
                        Últimos chamados
                        </CardTitle>
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap mb-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Empresa</th>
                                        <th>Data</th>
                                        <th>Responsável</th>
                                        <th>Status</th>
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