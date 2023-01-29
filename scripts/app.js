import {
    onLoginSuccess,
    onSignupSuccess,
    onFailure,
    loginFailure,
    onCreatePlaylistSuccess,
    onIndexPlaylistSuccess,
} from './ui.js'

import {
    login,
    signup,
    createPlaylist,
    indexPlaylists,
} from './api.js'

const loginContainer = document.querySelector('#login-container')
const signupContainer = document.querySelector('#signup-container')
const messageContainer = document.querySelector('#message-container')
const playlistIndexContainer = document.querySelector('#playlist-index-container')
const playlistShowContainer = document.querySelector('#playlist-show-container')
const playlistCreateContainer = document.querySelector('#playlist-create-container')
const playlistCreateForm = document.querySelector('#playlist-create-form')
const startPlaylistCreateButton = document.querySelector('#start-playlist-button')

/* ------ User actions ------ */
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
        // running playlist indexes somehow throw loginFailure
        // .then((res) => res.json())
        // .then((res) => onIndexPlaylistSuccess(res.playlists))
        // .then(indexPlaylists)
        .catch(loginFailure)
})

/* ------ Playlist Actions ------ */
// event listener to reveal playlist create form from playlist index container
startPlaylistCreateButton.addEventListener('click', (event) => {
    event.preventDefault()
    playlistIndexContainer.classList.add('hide')
    playlistCreateContainer.classList.remove('hide')
})

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
        // .then((res) => res.json())
        .then((res) => onIndexPlaylistSuccess(res.playlists))
        .catch(onFailure)
})

