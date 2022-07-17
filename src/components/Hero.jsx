import './Hero.css'

export default function Hero ({setCurrentPage}) {
    return (
        <div className='hero'>
            <h1>Making a change?</h1>
            <p>Convert your Spotify playlists to Youtube Music here!</p>
            <button onClick={() => {setCurrentPage('Main')}}>Get Converting!</button>
        </div>
    )
}