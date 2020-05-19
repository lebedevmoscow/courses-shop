import React, {useContext} from 'react'
import {AuthContext} from './../context/Auth.Context'
import {NavLink, useHistory} from 'react-router-dom'

export const Navbar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ваши ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}