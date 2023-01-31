import { store } from './store.js'

/* - all of auth container - */
const authContainer = document.querySelector('#auth-container')

/* - playlist container selectors */
const playlistIndexContainer = document.querySelector('#playlist-index-container')

const playlistShowContainer = document.querySelector('#playlist-show-container')

const playlistCreateContainer = document.querySelector('#playlist-create-container')

const playlistCreateForm = document.querySelector('#playlist-create-form')

const messageContainer = document.querySelector('#message-container')

const createPlaylistButton = document.querySelector('#start-playlist-button')


/* ------ Failure messages ------ */
// Login failure
export const loginFailure = (error) => {
    messageContainer.innerHTML = 
    `
    <p>Oops! Incorrect email/password</p> 
    `
    console.log(error)
}

// General failure message
export const onFailure = (error) => {
    messageContainer.innerHTML = `error ${error}`
}

/* ------ User Actions ------ */
// Login success
export const onLoginSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('hide')
    playlistIndexContainer.classList.remove('hide')
}

// Signup success
export const onSignupSuccess = () => {
    messageContainer.innerHTML = "You've successfully created an account! Login to get started."
}


/* ------ Playlist Actions ------ */
// Successfully created new playlist
export const onCreatePlaylistSuccess = () => {
    messageContainer.innerText = "Successfully created a new playlist"
}

// Index playlists that the logged in user owns
export const onIndexPlaylistSuccess = (playlists) => {
    playlists.forEach((playlist) => {
        const div = document.createElement('div')

        // come back to create anchor tag for new div
        // const playlistShowLink = document.createElement('a')
        // div.append(playlistShowLink)

        div.classList.add('playlist-card')

        div.innerHTML = `
            <h3>${playlist.name}</h3>
            <button type="button" data-id="${playlist._id}" class="show-playlist">View playlist</button>
        `
        playlistIndexContainer.appendChild(div)
    })
}

// Show single playlist
export const onShowPlaylistSuccess = (playlist) => {
    // hiding index container, showing playlist container
    playlistIndexContainer.classList.add('hide')
    createPlaylistButton.classList.add('hide')
    playlistShowContainer.classList.remove('hide')
    
    // creating a new element to reveal the playlist
    const playlistName = document.createElement('div')
    const songDetails = document.createElement('div')
    
    playlistName.innerHTML = `
        <h2>${playlist.name}</h2>
    `

    // button to update selected playlist
    const updatePlaylistButton = document.createElement('div')
    updatePlaylistButton.innerHTML = `
        <button data-id="${playlist._id}" class="update-playlist">Update playlist</button>
    `
    playlistShowContainer.appendChild(playlistName)

    // iterate through songs array if there's an array
    if (playlist.songs.length > 0){
        for (let i=0; i < playlist.songs.length ; i++){
            songDetails.setAttribute("data-id", `${playlist.songs[i]._id}`)

            songDetails.innerHTML = `
                <p>${playlist.songs[i].title}</p>
                <p>${playlist.songs[i].artist}</p>
                <p><a href="${playlist.songs[i].link}">${playlist.songs[i].link}</a></p>
            `
            playlistShowContainer.appendChild(songDetails)
        }
    } else {
        songDetails.innerHTML = `
            <p>You don't have any songs added!</p>
        `
        playlistShowContainer.appendChild(songDetails)
    }
    playlistShowContainer.appendChild(updatePlaylistButton)
}

// Update playlist
export const onUpdatePlaylistSuccess = (playlist) => {
    
    
    messageContainer.innerHTML = `
        Successfully updated playlist!
    `
}