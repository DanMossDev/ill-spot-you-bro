# Spotify to Youtube - Playlist Converter!
----
## Welcome
Thanks for checking out my project! It's a simple React app that interacts with both the Spotify API and the Google API to convert Spotify playlists into YouTube playlists.
It's inspired quite simply by the fact that I moved from Spotify to Youtube Music and had a right pain trying to sort shift my playlists over.
While some converters do indeed exist, most of them are 1) not terribly accurate in conversion, 2) require $$$ - so I figured what better project than one I need myself.

## Plans
Currently it just lets you grab an auth token from Spotify and grab your playlist data - next I intend to implement the first basic translation of that to a new playlist, and from there I'd quite like to add a nice user friendly system to check the conversion was accurate! Perhaps some quick swiping yes/no on if the song it found on Youtube's end is what you want in the playlist, as I'd found that a huge number of songs entered in other conversions were bootlegs, live versions, covers, etc. and I'd like to let users verify the data.