import React, {useState, useEffect} from 'react'
import {useHttp} from './../hooks/http.hook'
import {useMessage} from './../hooks/message.hook'
import {useContext} from 'react'
import {AuthContext} from './../context/Auth.Context'

export const AuthPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [message, error, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сервис сокращения ссылок</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}  />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            disabled={loading}
                            onClick={loginHandler}
                            style={{marginRight: 10}}>
                                Войти
                        </button>
                        <button
                            disabled={loading}
                            onClick={registerHandler}
                            className="btn grey lighten-1 black-text">
                                Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}