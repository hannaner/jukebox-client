import {
    onLoginSuccess,
    onSignupSuccess,
} from './ui.js'

import {
    login,
    signup,
} from './api.js'

const loginContainer = document.querySelector('#login-container')
const signupContainer = document.querySelector('#signup-container')
const messageContainer = document.querySelector('#message-container')
const playlistIndexContainer = document.querySelector('#playlist-index-container')
const playlistShowContainer = document.querySelector('#playlist-show-container')

/* ------ User actions ------ */
