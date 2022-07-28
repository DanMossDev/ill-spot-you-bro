# Spotify to Youtube - Playlist Converter!
----
## Welcome
Thanks for checking out my project! It's a simple React app that interacts with both the Spotify API and the Google API to convert Spotify playlists into YouTube playlists.
It's inspired quite simply by the fact that I moved from Spotify to Youtube Music and had a right pain trying to sort shift my playlists over.
While some converters do indeed exist, most of them are 1) not terribly accurate in conversion, 2) require $$$ - so I figured what better project than one I need myself.

## What does it do?
The app lets you log in to Spotify and Google accounts using OAuth, then get a playlist from Spotify and transfer it over to YouTube! In theory it works great, but in practise due to Google's limitations on API usage, especially for individual users rather than companies, it has heavily limited usage. Only 10,000 quota is assigned per day, which between various things means you get fewer than 100 songs per day that can be transferred, and only those who I expressly mark as test users can successfully authenticate.

As a result, I've recorded a simple demo to show the software in action, [which can be watched here](https://youtu.be/t_o1uDLeaiE)
