import React from "react"
import {Button} from "reactstrap"

const BtnLoader = ({loading}) =>(
    <Button type="submit" disabled={loading} color="primary" className="mr-1 waves-effect waves-light">{loading ? "Carregando" : "Salvar"}</Button>

)

export default BtnLoader