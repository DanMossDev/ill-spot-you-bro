import axios from 'axios'
import {useEffect} from 'react'

export default function GetPlaylists({setData, token, setToken}) {
    useEffect(() => {
        if (localStorage.getItem('accessToken')) setToken(localStorage.getItem('accessToken'))
    }, [])

    return <>
    <button onClick={() => {getPlaylists(token, setData)}}>Get Playlists</button>
    </>
}

function getPlaylists(token, setData) {
    axios.get('https://api.spotify.com/v1/me/playlists', { //endpoint for the current user
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(response => {
        setData(response.data)
    })
    .catch(err => console.log(err))
}