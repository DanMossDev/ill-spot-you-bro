import { useState, useEffect } from "react"
import {GoogleLogin} from 'react-google-login'

export default function YoutubeLogin({tracksData}) {
    const googleClientID = '1096096401026-dk24mo4rsrlkquvam5opd50e357u09le.apps.googleusercontent.com'
    const [trackArray, setTrackArray] = useState([])
    useEffect(() => {
        const newTrackArray = []
        tracksData.items.forEach(item => {
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

    function onSuccess(res) {
        if (localStorage.getItem('youtubeExpires') && localStorage.getItem('youtubeExpires') < Date.now()) localStorage.clear()
        if (!localStorage.getItem('youtubeAccessToken')) {
            const {access_token, expires_in} = res.tokenObj

            const youtubeExpires = Date.now() + (expires_in * 1000)
      
            localStorage.setItem("youtubeAccessToken", access_token)
            localStorage.setItem("youtubeExpires", youtubeExpires)
    }
    }

    function onFailure(res) {
        console.log('Login failed', res)
    }
    

    return <div className="sign-in-button">
        <GoogleLogin
            clientId={googleClientID}
            buttonText="Login to YouTube"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
}