import React, { useState } from 'react';

import {Input,  Table, Label, } from "reactstrap";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
//Import Breadcrumb


const ProdutosTable = ({produtos}) => {

    console.log(produtos)

    const Orders = [
                { id: "customCheck2", orderId: "#SK2540", billingName: "Neal Matthews", Date: "07 Oct, 2019", total: "$400", badgeclass: "success", paymentStatus: "Paid", methodIcon: "fa-cc-mastercard", paymentMethod: "Mastercard" },
            ];

    return (
           <React.Fragment>

            <div className="table-responsive">
                <Table className="table table-centered table-nowrap">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ width: "20px" }}>
                                <div className="custom-control custom-checkbox">
                                    <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <Label className="custom-control-label" htmlFor="customCheck1">&nbsp;</Label>
                                </div>
                            </th>
                            <th style={{ width: "50px" }}>Foto</th>
                            <th>Nome</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map((order, key) =>
                                <tr key={"_order_" + key}>
                                    <td>
                                        <div className="custom-control custom-checkbox">
                                            <Input type="checkbox" className="custom-control-input" id={order.pk} />
                                            <Label className="custom-control-label" htmlFor={order.pk}>&nbsp;</Label>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={ order.imagens[0].url} alt="product-img" title="product-img" className="avatar-md" />

                                    </td>
                                    <td>{order.nome}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            </div>

            </React.Fragment>
          );
    }
        
export default ProdutosTable;