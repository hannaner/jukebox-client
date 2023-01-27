import {
    onLoginSuccess,
    onSignupSuccess,
    onFailure,
    loginFailure,
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

loginContainer.addEventListener('')