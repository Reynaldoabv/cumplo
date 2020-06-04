import React from 'react'
import './header.scss'

import Logo from '../../assets/Logo_cumplo.svg'

const Header = props => {
    return (
        <div className="header">
            <img src={Logo} alt="cumplo-logo"/>
        </div>
    )
}

export default Header
