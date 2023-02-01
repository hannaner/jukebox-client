import {
    onLoginSuccess,
    onSignupSuccess,
    onFailure,
    loginFailure,
    onCreatePlaylistSuccess,
    onIndexPlaylistSuccess,
    onShowPlaylistSuccess,
    showEditPlaylistForm,
    onUpdatePlaylistSuccess,
    onDeleteSongSuccess,
} from './ui.js'

import {
    login,
    signup,
    createPlaylist,
    indexPlaylists,
    showPlaylist,
    updatePlaylist,
    deleteSongFromPlaylist,
} from './api.js'

const loginContainer = document.querySelector('#login-container')
const signupContainer = document.querySelector('#signup-container')
const messageContainer = document.querySelector('#message-container')
const playlistIndexContainer = document.querySelector('#playlist-index-container')
const playlistShowContainer = document.querySelector('#playlist-show-container')
const playlistCreateContainer = document.querySelector('#playlist-create-container')
const playlistCreateForm = document.querySelector('#playlist-create-form')
const startPlaylistCreateButton = document.querySelector('#start-playlist-button')
const playlistUpdateContainer = document.querySelector('#playlist-update-container')

/* ------ User actions ------ */
// Sign up
signupContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target['email'].value,
            password: event.target['password'].value
        }
    }
    signup(userData)
        .then(onSignupSuccess)
        .catch(onFailure)
})

// Login
loginContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target['email'].value,
            password: event.target['password'].value
        }
    }
    login(userData)
        .then((res) => res.json())
        .then((res) => onLoginSuccess(res.token))
        .then(indexPlaylists)
        .then((res) => res.json())
        .then((res) => onIndexPlaylistSuccess(res.playlists))
        .then(indexPlaylists)
        .catch(loginFailure)
})

/* ------ Playlist Actions ------ */
// event listener to reveal playlist create form from playlist index container
startPlaylistCreateButton.addEventListener('click', (event) => {
    event.preventDefault()
    playlistIndexContainer.classList.add('hide')
    playlistCreateContainer.classList.remove('hide')
    startPlaylistCreateButton.classList.add('hide')
})

// Create new playlist
playlistCreateForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const playlistData = {
        playlist: {
            name: event.target['name'].value,
            songs: [
                {
                    title: event.target['song-title'].value,
                    artist: event.target['song-artist'].value,
                    link: event.target['song-link'].value
                }
            ]
        }
    }

    createPlaylist(playlistData)
        .then(onCreatePlaylistSuccess)
        .then(indexPlaylists)
        .then((res).res.json())
        .then((res) => onIndexPlaylistSuccess(res.playlists))
        .catch(onFailure)
})

// Show playlist
playlistIndexContainer.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.classList.contains('show-playlist')){
        const playlistId = event.target.getAttribute('data-id')
        
        if (!playlistId) return
        
        showPlaylist(playlistId)
            .then((res) => res.json())
            .then((res) => {
                onShowPlaylistSuccess(res.playlist)
            })
            .catch(onFailure)
    }
})

// Show update playlist form
playlistShowContainer.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.classList.contains('update-playlist')){
        const playlistId = event.target.getAttribute('data-id')
        showPlaylist(playlistId)
            .then((res) => res.json())
            .then((res) => {
                showEditPlaylistForm(res.playlist)
            })
            .catch(onFailure)
    }
})

// listener to update playlist name
playlistUpdateContainer.addEventListener('submit', (event) => {
    event.preventDefault()

    if (event.target.classList.contains('update-playlist-name-form')){
        const playlistId = event.target.getAttribute('data-id')

        const newPlaylistName = {
            playlist:
            {
                name: event.target['playlist-name'].value
            }
        }
        updatePlaylist(newPlaylistName, playlistId)
            .then(onUpdatePlaylistSuccess)
            .catch(onFailure)
    }
})

// listener to delete playlist song


playlistUpdateContainer.addEventListener('click', (event) => {
    const deleteSongItemContainer = document.querySelector('.delete-song-item')
    
    console.log('event listener happened')
    event.preventDefault()
    // if (event.target.classList.contains('delete-song-item')){
    //     console.log('in if statement')
    //     const songId = event.target.getAttribute('data-id')
        
    //     if (!songId) return

    //     deleteSongFromPlaylist(songId)
    //         .then(onDeleteSongSuccess)
    //         .catch(onFailure)
    // }
    console.log(deleteSongItemContainer)
    const touchedTarget = event.target
    console.log("touched target")
    console.log(touchedTarget)

    let playlistId

    if (touchedTarget){
        console.log('in if statement')
        const songId = touchedTarget.getAttribute('data-id')
        console.log(`songId ${songId}`)
        //Uncaught TypeError: Cannot read properties of null (reading 'getAttribute')
        // at HTMLDivElement.<anonymous> (app.js:180:52)
        // (anonymous) @ app.js:180
        
        if (deleteSongItemContainer){
            playlistId = deleteSongItemContainer.getAttribute('data-id')
        }
        console.log(`playlistId ${playlistId}`)
        

        if (!songId) return

        deleteSongFromPlaylist(songId)
            .then(console.log)
            .then(onDeleteSongSuccess)
            .then(indexPlaylists)
            .catch(onFailure)
    }
})

// listener to add playlist song

// delete playlist and its songs