export default function GetUser() {
    return <button onClick={spotifyAuth}>Login to Spotify</button>
}

function spotifyAuth() {
    const authEndpoint = 'https://accounts.spotify.com/authorize'
    const clientID = 'd5cf965142af4914a39b012b6e6dbbcf'
    const redirectURI = window.location.href
    console.log(redirectURI)
    const scopes = ['playlist-read-private', 'playlist-read-collaborative'].join('%20')

    window.location = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes}&response_type=token&show_dialog=true`
}