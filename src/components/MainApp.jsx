import './MainApp.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import GetPlaylists from './Spotify/GetPlaylists'
import GetUser from './Spotify/GetUser'
import Playlist from './Spotify/Playlists'
import YoutubeLogin from './YouTube/YoutubeLogin'
import {gapi} from 'gapi-script'

export default function MainApp () {
    const [token, setToken] = useState('')
    const [data, setData] = useState({})
    const [selectedPlaylist, setSelectedPlaylist] = useState()
    const [tracksData, setTracksData] = useState()

    useEffect(() => {
        const url = selectedPlaylist?.tracks.href
        axios.get(url, { //endpoint for the current playlist
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setTracksData(response.data)
        })
        .catch(err => console.log(err))

    }, [selectedPlaylist])

    useEffect(() => {
        const googleAppID = 'AIzaSyA8cC0_E_Bc-vzRprOItLWRjsHXNvKC9KQ'
        const googleClientID = '1096096401026-dk24mo4rsrlkquvam5opd50e357u09le.apps.googleusercontent.com'
    }, [tracksData])

    return (
        <main>
            {!localStorage.getItem('accessToken') && <GetUser className="button"/>}
            {localStorage.getItem('accessToken') && !data.items && <GetPlaylists className="button" setData={setData} token={token} setToken={setToken}/>}
            {!selectedPlaylist && <Playlist data={data} setSelectedPlaylist={setSelectedPlaylist}/>}
            {tracksData && <YoutubeLogin tracksData={tracksData}/>}
        </main>
    )
}

