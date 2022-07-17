import './App.css';
import {useState, useEffect} from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MainApp from './components/MainApp';

function App() {
  const [currentPage, setCurrentPage] = useState('Hero')

  useEffect(() => {
    if (localStorage.getItem('expires') < Date.now()) localStorage.clear()
    if (window.location.hash) {
      setCurrentPage('Main')
      const {access_token, expires_in, token_type} = checkSpotifyAuth(window.location.hash, setCurrentPage)

      const expires = Date.now() + expires_in * 1000
      
      localStorage.clear()
      localStorage.setItem("accessToken", access_token)
      localStorage.setItem("expires", expires)
    }
  }, [])



  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage}/>
      <Switch currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

function Switch({currentPage, setCurrentPage}) {
  switch(currentPage) {
    case 'Hero': return <Hero setCurrentPage={setCurrentPage}/>
    case 'Main': return <MainApp />
    default: return <Hero setCurrentPage={setCurrentPage}/>
  }
}

function checkSpotifyAuth(hash) {
  const token = hash.substring(1)
  const paramsURL = token.split('&')
  const params = paramsURL.reduce((accum, current) => {
    const [key, value] = current.split('=');
    accum[key] = value
    return accum
  }, {})
  return params
}

export default App;
