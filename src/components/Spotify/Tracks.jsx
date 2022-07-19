import { useState, useEffect } from "react"

export default function Tracks({tracksData}) {
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
                    albumArt: item.track.album.images[0].url
                }
                newTrackArray.push(itemObj)
            }
        })

        setTrackArray(newTrackArray)
    }, [tracksData])
    

    return <div>
        {JSON.stringify(trackArray, null, 2)}
    </div>
}