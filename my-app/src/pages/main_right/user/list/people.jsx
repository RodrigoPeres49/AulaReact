import React from 'react';
import '../../../../App.js';


function People({people}){

    return (

        
        people.map((element, index) =>{
            return (
                <tbody>
                    <tr>
                        <td key={index}> {element['nome']}</td>
                        <td>{element['sobrenome']}</td>
                        <td>{element['idade']}</td>
                        <td>{element['profissao']}</td>
                        <td>{element['matricula']}</td>
                    </tr>
                </tbody>
            )
        })
    )
}

export default People;