import './YoutubeLogin.css'
import {GoogleLogin} from 'react-google-login'

export default function YoutubeLogin({setYoutubeToken}) {
    const googleClientID = process.env.REACT_APP_CLIENT_ID

    function onSuccess(res) {
        if (localStorage.getItem('youtubeExpires') && localStorage.getItem('youtubeExpires') < Date.now()) localStorage.clear()
        if (!localStorage.getItem('youtubeAccessToken')) {
            const {access_token, expires_in} = res.tokenObj

            const youtubeExpires = Date.now() + (expires_in * 1000)
            localStorage.setItem("youtubeAccessToken", access_token)
            localStorage.setItem("youtubeExpires", youtubeExpires)
            setYoutubeToken(access_token)
        }
    }
    function onFailure(res) {
        console.log('Login failed', res)
    }
    

    return <div>
        <GoogleLogin className="sign-in-button"
            clientId={googleClientID}
            buttonText="Login to YouTube"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            scope={'https://www.googleapis.com/auth/youtube'}
        />
    </div>
}