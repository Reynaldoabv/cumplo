import React, { useState } from 'react'
import './form.scss'

import axios from 'axios'

import Spinner from '../spinner/Spinner'

const Form = () => {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState({
        month:'',
        year: ''
    })
    const [monthError, setMonthError] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target;

        setDates({ ...dates, [name]: value});
    }

    const fetchingData = () => {
        setLoading(true)
        const {month, year} = dates
        const apiKey = "9c84db4d447c80c74961a72245371245cb7ac15f"
        if(month.length < 2 ) {
            let my_string =" "
            my_string = '0' + my_string;
        }
        if(month.length > 4){
            setMonthError(true)
        }
        const url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${year}/${month}?apikey=${apiKey}&formato=json`

        axios
            .get(url)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onSubmit = e => {
        e.preventDefault()

        fetchingData()
    }

    const { Dolares } = data

    let valorDolar = []

    return (
        <div className="chart">
            <div className="row">
                <div className="col-12">
                    {
                        Dolares && Dolares.map(item => (
                            parseInt(valorDolar.push(item.Valor))                            
                        ))
                    }
                    { console.log(valorDolar.length, "valorDolar")}
                </div>
                <div className="col-6">
                    <form onSubmit={onSubmit}>
                        <label className="title-form">Please enter month and year of the data that you want to get</label>
                        <div className="form-group">
                            <input 
                                type="number" 
                                placeholder="Month"
                                onChange={handleChange}
                                name="month"                                
                            />
                        </div>  
                        <div className="form-group">
                            <input 
                                type="number" 
                                placeholder="Year"
                                onChange={handleChange}
                                name="year"
                            />
                            { monthError ? <h4 className="text-danger">Error</h4> : null }
                        </div>              
                        <button type="submit" className="btn btn-success mb-5">Submit</button>
                    </form>
                </div>
                <div className="col-6 text-center">
                    { loading ? <Spinner /> : Dolares && Dolares.map(dolar =>
                        (<><h6 key={dolar.id}><span className="titles">Price: </span> {dolar.Valor} on <span className="titles"> date: </span> {dolar.Fecha}</h6><br/></>)
                        ) 
                    }
                </div>
            </div>
        </div>
    )
}

export default Form
