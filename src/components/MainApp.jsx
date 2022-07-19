import './MainApp.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import GetPlaylists from './Spotify/GetPlaylists'
import GetUser from './Spotify/GetUser'
import Playlist from './Spotify/Playlists'
import Tracks from './Spotify/Tracks'

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

    return (
        <main>
            {!localStorage.getItem('accessToken') && <GetUser className="button"/>}
            {localStorage.getItem('accessToken') && !data.items && <GetPlaylists className="button" setData={setData} token={token} setToken={setToken}/>}
            {!selectedPlaylist && <Playlist data={data} setSelectedPlaylist={setSelectedPlaylist}/>}
            {tracksData && <Tracks tracksData={tracksData}/>}
        </main>
    )
}

