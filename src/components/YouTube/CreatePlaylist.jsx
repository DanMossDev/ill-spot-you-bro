import { useState, useEffect } from "react"
import axios from "axios"

export default function CreatePlaylist({youtubeTracks, youtubeToken}) {
    const [playlistTitle, setPlaylistTitle] = useState('')
    const [playlistID, setPlaylistID] = useState('')
    console.log(youtubeToken, '<<')

    function submitHandler(e) {
        e.preventDefault()

        makePlaylist(youtubeToken, playlistTitle)//.then(({data}) => setPlaylistID(data.id))
    }

    // useEffect(() => {
    //     youtubeTracks.forEach(track => {
    //         addToPlaylist(youtubeToken, track, playlistID)
    //     })
    // }, [playlistID])

    return <form onSubmit={submitHandler}>
        <label>Playlist Title: </label>
        <input type="text" value={playlistTitle} onChange={e => setPlaylistTitle(e.target.value)}></input>
        <button type="submit">Transfer Your Playlist</button>
    </form>
}

function makePlaylist(youtubeToken, title) {
    const apiKey = 'AIzaSyBnuuQQVDIN8ItjfSdwABFMHUD1qCuTiDw'
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
    const apiKey = 'AIzaSyBnuuQQVDIN8ItjfSdwABFMHUD1qCuTiDw'
    return axios.put(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&access_token=${youtubeToken}`, {
        "snippet": {
        "playlistId": playlistID,
        "resourceId": {
          "videoId": track
        }
      }
    }, {
        Authorization: 'Bearer ' + youtubeToken,
        Accept: "application/json",
        "Content-Type": "application/json"
    })
}