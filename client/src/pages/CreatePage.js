import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from './../context/Auth.Context'
import {useHistory} from 'react-router-dom'
import {useHttp} from './../hooks/http.hook'

export const CreatePage = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const {request} = useHttp();
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                // {from: link}
                const data = await request('/api/link/generate', 'POST', {to: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <input 
                    placeholder="Вставьте вашу ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onKeyPress={pressHandler} />
                <label htmlFor="link">Введите вашу ссылку</label>
            </div>
        </div>
    )
}