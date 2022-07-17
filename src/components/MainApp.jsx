import './MainApp.css'
import {useState} from 'react'
import GetPlaylists from './Spotify/GetPlaylists'
import GetUser from './Spotify/GetUser'
import Playlist from './Spotify/Playlists'

export default function MainApp () {
    const [data, setData] = useState({})
    const [selectedPlaylist, setSelectedPlaylist] = useState()

    return (
        <main>
            {!localStorage.getItem('accessToken') && <GetUser className="button"/>}
            {!data.items && <GetPlaylists className="button" setData={setData}/>}
            {!selectedPlaylist && <Playlist data={data} setSelectedPlaylist={setSelectedPlaylist}/>}
            {/* FROM HERE: View playlist you've selected, maybe show its artwork/mosaic, tracklist, etc. - then implement integration to a youtube playlist */}
        </main>
    )
}

