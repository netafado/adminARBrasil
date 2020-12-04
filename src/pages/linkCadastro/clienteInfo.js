import React  from 'react';

import {Table } from "reactstrap"
const InfoCliente = ({user}) =>{
    return(
        <Table className="mb-0 text-left">
        <tbody>
            <tr>
                <th scope="row"> Empresa: </th>
                <td>Empresa minha obra</td>
            </tr>
            <tr>
                <th scope="row">Nome:</th>
                <td>Cynthia Price</td>
            </tr>
            <tr>
                <th scope="row">Cargo:</th>
                <td>CEO</td>
            </tr>
            <tr>
                <th scope="row">CPF:</th>
                <td>123.1231.12321.-02</td>
            </tr>
            <tr>
                <th scope="row">Telefone:</th>
                <td>(123) 123 1234</td>
            </tr>
            <tr>
                <th scope="row">E-mail :</th>
                <td>cynthiaskote@gmail.com</td>
            </tr>
        </tbody>
    </Table>
    )
}

export default InfoCliente