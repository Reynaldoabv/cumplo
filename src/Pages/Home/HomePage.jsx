import React from 'react'
import './home-page.scss'

import DollarTodaysPrice from '../../components/dollar-todays-price/DollarTodaysPrice'
import Form from '../../components/form/Form'

import useFetch from '../../useFetch/useFetch'

const HomePage = props => {

    const apiKey = "9c84db4d447c80c74961a72245371245cb7ac15f"
    const url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=${apiKey}&formato=json`
    const useFetchResponse = useFetch(url, { loading: true, data: null})

    return (
        <div className="home-page">
            <div className="container">
                <h1 className="text-center title">Dollar Today's Price</h1>
                <DollarTodaysPrice loading={useFetchResponse.loading} data={useFetchResponse.data} />
                <Form />
            </div>
        </div>
    )
}

export default HomePage
