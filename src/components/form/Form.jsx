import React, { useState } from 'react'
import './form.scss'

import axios from 'axios'

import Spinner from '../spinner/Spinner'
import Chart from '../chart/Chart'

const Form = () => {
    const [form, setForm] = useState({
        data: {},
        loading: false
    })
    const [date, setDates] = useState({
        month:'',
        year: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;

        setDates({ ...date, [name]: value});
    }

    const fetchingData = () => {
        setForm({ ...form, loading: true })
        const {month, year} = date
        const apiKey = "9c84db4d447c80c74961a72245371245cb7ac15f"
        if(month.length < 2 ) {
            let my_string =" "
            my_string = '0' + my_string
        }
        const url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${year}/${month}?apikey=${apiKey}&formato=json`

        axios
            .get(url)
            .then(res => {
                setForm({ ...form, data: res.data, loading: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onSubmit = e => {
        e.preventDefault()
        fetchingData()
    }
    
    const { loading, data } = form
    const { Dolares } = data

    const dates = Dolares && Dolares.map(function(dolar) {
        return dolar['Fecha'];
    })

    const values = Dolares && Dolares.map(function(dolar) {
        return dolar['Valor'];
    })

    return (
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-5">
                    <form onSubmit={onSubmit}>
                        <h3 className="title-form">Here you can find dollar's price in the range of 2010 and 2020 by entering the month and year you want to consult</h3>
                        <div className="form-group">
                            <label>Please enter Month </label><br/>
                            <input 
                                type="number" 
                                placeholder="2 digits"
                                onChange={handleChange}
                                name="month"                                
                            />
                        </div>  
                        <div className="form-group">
                            <label>Please enter Year </label><br/>
                            <input 
                                type="number" 
                                placeholder="4 digits"
                                onChange={handleChange}
                                name="year"
                            />
                        </div>              
                        <button type="submit" className="btn btn-success mb-5">Submit</button>
                    </form>
                </div>
                <div className="col-12 col-md-7 text-center">                    
                    { loading ? <Spinner /> : <Chart dates={dates} values={values} /> }
                </div>
            </div>
        </div>
    )
}

export default Form
