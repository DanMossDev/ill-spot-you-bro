import axios from 'axios'
import {useEffect} from 'react'


export default function GetPlaylists({setData, token, setToken, setError}) {
    useEffect(() => {
        if (localStorage.getItem('accessToken')) setToken(localStorage.getItem('accessToken'))
    }, [])

    return <>
    <button onClick={() => {getPlaylists(token, setData, setError)}}>Get Playlists</button>
    </>
}

function getPlaylists(token, setData, setError) {
    axios.get(`https://api.spotify.com/v1/me/playlists`, { //endpoint for the current user
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(response => {
        setData(response.data)
    })
    .catch(err => setError(err))
}