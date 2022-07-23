import './MainApp.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import GetPlaylists from './Spotify/GetPlaylists'
import GetUser from './Spotify/GetUser'
import Playlist from './Spotify/Playlists'
import YoutubeLogin from './YouTube/YoutubeLogin'
import {gapi} from 'gapi-script'
import SearchYoutube from './YouTube/SearchYoutube'
import CreatePlaylist from './YouTube/CreatePlaylist'

export default function MainApp () {
    const [token, setToken] = useState('')
    const [youtubeToken, setYoutubeToken] = useState('')
    const [data, setData] = useState({})
    const [selectedPlaylist, setSelectedPlaylist] = useState()
    const [tracksData, setTracksData] = useState()
    const [trackArray, setTrackArray] = useState([])
    const [youtubeTracks, setYoutubeTracks] = useState([])
    const [isSearching, setIsSearching] = useState(true)
    
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
        const newTrackArray = []
        tracksData?.items.forEach(item => {
            let itemObj
            if (item?.track?.name) {
                itemObj = {
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    title: item.track.name,
                    albumArt: item.track.album.images[0].url,
                    searchTerm: `${item.track.artists[0].name} ${item.track.name}`
                }
                newTrackArray.push(itemObj)
            }
        })

        setTrackArray(newTrackArray)
    }, [tracksData])

    useEffect(() => {
        if (trackArray.length !== 0 && trackArray.length === youtubeTracks.length) setIsSearching(false)
    }, [youtubeTracks, trackArray])

    return (
        <main>
            {!localStorage.getItem('accessToken') && <GetUser className="button"/>}
            {localStorage.getItem('accessToken') && !data.items && <GetPlaylists className="button" setData={setData} token={token} setToken={setToken}/>}
            {!selectedPlaylist && <Playlist data={data} setSelectedPlaylist={setSelectedPlaylist}/>}
            {(tracksData && !localStorage.getItem('youtubeAccessToken')) && <YoutubeLogin tracksData={tracksData} setYoutubeToken={setYoutubeToken}/>}
            {(tracksData && localStorage.getItem('youtubeAccessToken') && isSearching) && <SearchYoutube trackArray={trackArray} setYoutubeTracks={setYoutubeTracks} setYoutubeToken={setYoutubeToken} youtubeToken={youtubeToken}/>}
            {!isSearching && <CreatePlaylist youtubeTracks={youtubeTracks} youtubeToken={youtubeToken}/>}
            <p>track {JSON.stringify(trackArray[0])}</p>
            <p>search {JSON.stringify(youtubeTracks)} {isSearching.toString()}</p>
        </main>
    )
}

