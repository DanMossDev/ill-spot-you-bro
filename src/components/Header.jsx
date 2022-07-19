import './Header.css'

export default function Header ({setCurrentPage}) {
    return (
    <header className='header' onClick={() => {setCurrentPage('Hero')}}>
        <h1>I'll Spot | You Bro</h1>
    </header>
    )
}