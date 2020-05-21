import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from './../hooks/http.hook'
import { AuthContext } from '../context/Auth.Context'
import {LinksList} from './../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState()
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return(<h1>Загрузка...</h1>)
    }

    return(
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}