import { useEffect } from "react"
import axios from "axios"

export default function SearchYoutube({trackArray, setYoutubeTracks, setYoutubeToken, youtubeToken}) {
    useEffect(() => {
        if (!youtubeToken) setYoutubeToken(localStorage.getItem('youtubeAccessToken'))
    })

    useEffect(() => {
        trackArray.forEach(track => {
            const queries = track.searchTerm.split(' ').join('%20')
            searchForVideo(youtubeToken, queries)
            .then(({data}) => setYoutubeTracks(currentTracks => {
                const tracksCopy = [...currentTracks]
                tracksCopy.push(data.items[0].id.videoId)
                return tracksCopy
            }))
            .catch(err => console.log(err))
        })
    }, [trackArray])

    return <p>Finding your songs...</p>
}

function searchForVideo(youtubeToken, queries) {
    const apiKey = process.env.REACT_APP_API_KEY
    return axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${queries}&key=${apiKey}`, {
        headers: {
            Accept: "application/json"
        }
    })
}