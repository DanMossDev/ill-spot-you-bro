# Spotify to Youtube - Playlist Converter!
----
## Welcome
Thanks for checking out my project! It's a simple React app that interacts with both the Spotify API and the Google API to convert Spotify playlists into YouTube playlists.
It's inspired quite simply by the fact that I moved from Spotify to Youtube Music and had a right pain trying to sort shift my playlists over.
While some converters do indeed exist, most of them are 1) not terribly accurate in conversion, 2) require $$$ - so I figured what better project than one I need myself.

## What does it do?
The app lets you log in to Spotify and Google accounts using OAuth, then get a playlist from Spotify and transfer it over to YouTube! In theory it works great, but in practise due to Google's limitations on API usage, especially for individual users rather than companies, it has heavily limited usage. Only 10,000 quota is assigned per day, which between various things means you get fewer than 100 songs per day that can be transferred, and only those who I expressly mark as test users can successfully authenticate.

As a result, I've recorded a simple demo to show the software in action, [which can be watched here](https://youtu.be/t_o1uDLeaiE)

## How can I use it myself?
If you want to use it yourself, you'll need to make your own [Google API account](https://console.cloud.google.com/) and create a new project. From there, you want to generate an API key (with at least access to YouTube Data v3) and a clientID on the credentials tab, and configure the OAuth consent screen. Ensure you enable the "Manage your YouTube account" scope.
Make sure you enable http://localhost:3000 as a redirect URI, add whichever Google account you want to use as a test user, and after that you should be good to go.

Clone this repo to your system, and create a .env file with the following:
```
REACT_APP_API_KEY=[your api key]
REACT_APP_CLIENT_ID=[your clientID]
```

And from there, you simply need to check you're in the right folder (it should be called spotify-to-youtube), and run the following commands to install dependencies and locally host:
```
npm install
npm start
```
And it should all work!
If something went wrong, check that you are hosting on port 3000, or drop me a message and I can help you to bugfix.
