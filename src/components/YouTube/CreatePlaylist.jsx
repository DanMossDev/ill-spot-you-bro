import './CreatePlaylist.css'
import { useState, useEffect } from "react"
import axios from "axios"

export default function CreatePlaylist({youtubeTracks, youtubeToken, setError}) {
    const [playlistTitle, setPlaylistTitle] = useState('')
    const [playlistID, setPlaylistID] = useState('')
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [createNow, setCreateNow] = useState(false)
    const [creatingPlaylist, setCreatingPlaylist] = useState(false)

    function submitHandler(e) {
        e.preventDefault()
        makePlaylist(youtubeToken, playlistTitle).then(({data}) => {
            setPlaylistID(data.id)
            setCreateNow(true)
        })
        .catch(err => setError(err))
    }

    useEffect(() => {
        const lastCall = youtubeTracks.length - 1
        if (isFirstRender) return setIsFirstRender(false)
        function callAPI(i) {
            setCreatingPlaylist(true)
            addToPlaylist(youtubeToken, youtubeTracks[i], playlistID)
            .then(() => {
                if (i < lastCall) callAPI(i + 1)
                else setCreatingPlaylist(false)
            })
            .catch(err => setError(err))
        }
        callAPI(0)
    }, [createNow])

    return !creatingPlaylist ? 
        !createNow ?
        <>
            <form onSubmit={submitHandler}>
            <label>Title: </label>
            <input type="text" value={playlistTitle} onChange={e => setPlaylistTitle(e.target.value)}></input>
            <button type="submit">Transfer</button>
        </form>
        </>
        :
        <>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                window.open(`https://www.youtube.com/playlist?list=${playlistID}`, '_blank')
            }}> View Playlist</button>
        </>
        
    : <div className="middle">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
        <div className="bar bar6"></div>
        <div className="bar bar7"></div>
        <div className="bar bar8"></div>
        <p style={{margin: 0}}>Making Your Playlist</p>
    </div>
}

function makePlaylist(youtubeToken, title) {
    const apiKey = process.env.REACT_APP_API_KEY
    const reqBody = {
        "snippet": {
          "title": `${title}`,
          "description": "Playlist converted from Spotify with I-Spot-You-Bro"
        }
      }
    return axios.post(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&key=${apiKey}&access_token=${youtubeToken}`, reqBody, {
        headers: {
            Authorization: "Bearer" + youtubeToken,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
}

function addToPlaylist(youtubeToken, track, playlistID) {
    const apiKey = process.env.REACT_APP_API_KEY
    return axios.post(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&access_token=${youtubeToken}`, {
        "snippet": {
        "playlistId": playlistID,
        "resourceId": {
            "kind": "youtube#video",
            "videoId": track
        }
      }
    }, {
        Accept: "application/json",
        "Content-Type": "application/json"
    })
}