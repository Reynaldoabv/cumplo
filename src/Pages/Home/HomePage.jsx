import React, { useState, useEffect } from 'react'
import './home-page.scss'

import axios from 'axios'

import DollarTodaysPrice from '../../components/dollar-todays-price/DollarTodaysPrice'
import Form from '../../components/form/Form'


const HomePage = props => {

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const apiKey = "9c84db4d447c80c74961a72245371245cb7ac15f"
        const url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=${apiKey}&formato=json`

        axios
            .get(url)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <div className="home-page">
            <div className="container">
                <h1 className="text-center title">Dollar Today's Price</h1>
                <DollarTodaysPrice loading={loading} data={data} />
                <Form />
            </div>
        </div>
    )
}

export default HomePage
