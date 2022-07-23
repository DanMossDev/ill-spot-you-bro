import {GoogleLogin} from 'react-google-login'

export default function YoutubeLogin({setYoutubeToken}) {
    const googleClientID = '27209248176-058lkubo7b7nqv4qcm9ivj7qkhn3vn0m.apps.googleusercontent.com'

    function onSuccess(res) {
        if (localStorage.getItem('youtubeExpires') && localStorage.getItem('youtubeExpires') < Date.now()) localStorage.clear()
        if (!localStorage.getItem('youtubeAccessToken')) {
            const {access_token, expires_in} = res.tokenObj
            console.log(res.tokenObj.access_token)

            const youtubeExpires = Date.now() + (expires_in * 1000)
            localStorage.setItem("youtubeAccessToken", access_token)
            localStorage.setItem("youtubeExpires", youtubeExpires)
            setYoutubeToken(access_token)
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
            scope={'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube'}
        />
    </div>
}