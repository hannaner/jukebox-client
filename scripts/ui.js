/* - all of auth container - */
const authContainer = document.querySelector('#auth-container')

/* - playlist container selectors */
const playlistIndexContainer = document.querySelector('#playlist-index-container')
const playlistShowContainer = document.querySelector('#playlist-show-container')

const messageContainer = document.querySelector('#message-container')


/* ------ Failure message ------ */
export const loginFailure = (error) => {
    messageContainer.innerHTML = 
    `
    <p>Oops! Incorrect email/password</p>
    <p>${error}</p>    
    `
}

/* ------ User Actions ------ */
export const onLoginSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    // need to store token
}

export const onSignupSuccess = () => {
 messageContainer.innerHTML = "Welcome to jukebox"
}