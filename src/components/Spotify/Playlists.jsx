import './Playlists.css'

export default function Playlist({data, setSelectedPlaylist}) {
    return <ul>
        {data?.items && data.items.map(item => <li key={item.id}><button onClick={() => {setSelectedPlaylist(item)}}>{item.name}</button></li>)}
    </ul>
}