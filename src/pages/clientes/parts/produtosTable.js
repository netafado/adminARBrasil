import React, {useState} from 'react';

import { Col } from "reactstrap";

const Produto = ({order, deletarProduto}) => {
    console.log(order)
    return(
        <div className="row border-bottom pb-2 pt-2" >
        <Col xs={6} sm={4}>
        <div className="avatar-md mr-2">
            <span className="avatar-title rounded-circle bg-light text-danger font-size-16" style={{backgroundImage : `url(${order.imagens ? order.imagens[0].url : null})`}}>
                </span>
            </div>

        </Col>
        <Col xs={6} sm={6}>
            <h5 className="font-size-15 mt-2">{order.nome}</h5>
            <p>Setup: { order.set ?  (order.set[0].setup || "---") : "---"}</p>
        </Col>
        <Col sm={2}>
        <ul className="list-inline mb-0 font-size-16">
            <li className="list-inline-item text-right float-right">
                <button className="btn btn-lg text-danger p-1" onClick={()=>deletarProduto(order.pk)}><i className="bx bxs-trash"></i></button>
            </li>
        </ul>
        </Col>

    </div>
    )
}

const ProdutosTable = ({produtos, deletarProduto}) => {
    return (
           <React.Fragment>
                        <div>
                            {
                                produtos.map((order, key) =>
                                    <Produto order={order} key={Math.random()} deletarProduto={deletarProduto}/>
                                )
                            }
                        </div>

            </React.Fragment>
          );
    }
        
export default ProdutosTable;

