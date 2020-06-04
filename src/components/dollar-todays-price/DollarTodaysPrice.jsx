import React from 'react'
import './dollar-todays-price.scss'

import Spinner from '../spinner/Spinner'

const DollarTodaysPrice = ({ loading, data }) => {
    return (
        <div className="dollar-price text-center">            
            { loading ? <Spinner /> : 
                <ul className="list">
                    <li><span className="titles">Date: </span>  {data.Dolares[0].Fecha}</li>
                    <li><span className="titles">Price: </span>  {data.Dolares[0].Valor}</li>
                </ul>    
            }                
        </div>
    )
}

export default DollarTodaysPrice
