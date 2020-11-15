import React, {useState} from 'react';
import {Link} from "react-router-dom"
import {Input, Col } from "reactstrap";

const Produto = ({order, adcionarProdutoComSetUp}) => {
    const  [setUp, setsetUp] = useState("")
    return(
        <div className="row" >
        <Col xs={2}>
            <img src={ order.imagens[0].url} placeholder="setup" alt="product-img" title="product-img" className="avatar-md" />
        </Col>
        <Col xs={3}>{order.nome}</Col>
        <Col xs={4}>
            <Input type="textarea" onChange={(e)=>setsetUp(e.target.value)} placeholder="setup"  id={order.pk} />
        </Col>
        <Col xs={2}>
        <ul className="list-inline mb-0 font-size-16">
            <li className="list-inline-item">
                <button onClick={()=> adcionarProdutoComSetUp(order, setUp)} className="text-success p-1"><i className="bx bxs-edit-alt"></i></button>
            </li>
            <li className="list-inline-item">
                <button  className="text-danger p-1"><i className="bx bxs-trash"></i></button>
            </li>
        </ul>
        </Col>

    </div>
    )
}

const ProdutosTable = ({produtos, adcionarProdutoComSetUp}) => {
    return (
           <React.Fragment>
                        <div>
                            {
                                produtos.map((order, key) =>
                                    <Produto order={order} key={Math.random()} adcionarProdutoComSetUp={adcionarProdutoComSetUp}/>
                                )
                            }
                        </div>

            </React.Fragment>
          );
    }
        
export default ProdutosTable;

