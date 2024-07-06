import React from "react"
import App from "../../App";


function Pessoas({pessoas}){

    return (
        pessoas.map((element, index) =>{
            return (
                <tbody>
                    <tr>
                        <td key={index}> {element['nome']}</td>
                        <td>{element['sobrenome']}</td>
                        <td>{element['idade']}</td>
                        <td>{element['profissao']}</td>
                    </tr>
                </tbody>
            )
        })
    )
}

export default Pessoas;