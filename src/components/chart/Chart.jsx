import React, { useState } from 'react'
import './chart.scss'

import { Bar } from 'react-chartjs-2';
import {backgroundColor} from './backgroundColor'

const Chart = ({ values, dates }) => {

    const arrDates = dates && Array(dates).flat()
    //Converting values string into number
    const valueToNum = values && values.map(value => {
        let intValue = parseFloat(value)
        return intValue
    })
    //Getting the average price
    let total = values && valueToNum.reduce((sum, current) => sum + current, 0)
    let average = values && total/values.length

    const lowerPrice = values && Math.min.apply(null, valueToNum)
    const higherPrice = values && Math.max.apply(null, valueToNum)


    const [chartData] = useState({
        labels: arrDates,
        datasets: [{
            label: "Dollar",
            data: valueToNum,
            backgroundColor: backgroundColor,
            borderWidth:1,
            borderColor: '#000',
            hoverBorderColor: 'red',
            hoverBorderWidth: 'green'
        }]
    })

    return (
        <div className='chart'>
            {
                dates && values ? 
                    <Bar
                        data={chartData}
                        options={{
                            title: {
                                display: true,
                                text: "Monthly dollar's price",
                                fontSize: 25
                            }
                        }}
                    /> : null
            }
            {
                values ? (
                    <div className="price">
                        <h6 className="prices">Average price: <span className="price-values">{average.toFixed(2)}</span></h6>
                        <h6 className="prices">Lower price: <span className="price-values">{lowerPrice.toFixed(2)}</span></h6>
                        <h6 className="prices">Higher price: <span className="price-values">{higherPrice.toFixed(2)}</span></h6>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Chart
