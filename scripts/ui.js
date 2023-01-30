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
export const loginFailure = (error) => {
    messageContainer.innerHTML = 
    `
    <p>Oops! Incorrect email/password</p> 
    `
    console.log(error)
}

export const onFailure = (error) => {
    messageContainer.innerHTML = `error ${error}`
}

/* ------ User Actions ------ */
export const onLoginSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('hide')
    playlistIndexContainer.classList.remove('hide')
}

export const onSignupSuccess = () => {
    messageContainer.innerHTML = "You've successfully created an account! Login to get started."
}


/* ------ Playlist Actions ------ */
export const onCreatePlaylistSuccess = () => {
    messageContainer.innerText = "Successfully created a new playlist"
}

export const onIndexPlaylistSuccess = (playlists) => {
    // need to find playlists where owner is the user._id
    // console.log(user)
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

export const onShowPlaylistSuccess = (playlist) => {
    // hiding index container, showing playlist container
    playlistIndexContainer.classList.add('hide')
    createPlaylistButton.classList.add('hide')
    playlistShowContainer.classList.remove('hide')
    
    // creating a new element to reveal the playlist
    const div = document.createElement('div')

    // iterate through songs array if there's an array
    if (playlist.songs.length > 0){
        for (i=0; i < playlist.songs.length ; i++){
            div.innerHTML = `
                <h2>${playlist.name}</h2>
                <p>${playlist.songs[i].title}</p>
                <p>${playlist.songs[i].artist}</p>
                <p><a href="${playlist.songs[i].link}">${playlist.songs[i].link}</a></p>
            `
            playlistShowContainer.appendChild(div)
        }
    } else {
        div.innerHTML = `
            <p>You don't have any songs added!</p>
        `
        playlistShowContainer.appendChild(div)
    }
}