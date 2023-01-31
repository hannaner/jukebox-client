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

const playlistUpdateContainer = document.querySelector('#playlist-update-container')


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
    // const songDetails = document.createElement('div')
    
    playlistName.innerHTML = `
        <h2>${playlist.name}</h2>
    `

    // button to update selected playlist
    const updatePlaylistButton = document.createElement('div')
    updatePlaylistButton.innerHTML = `
        <button data-id="${playlist._id}" class="update-playlist">Update playlist</button>
    `
    playlistShowContainer.appendChild(playlistName)

/** ---- attempt2 using forEach method ----  */   
    playlist.songs.forEach(song => {
        const songDetails = document.createElement('div')
        songDetails.setAttribute("data-id", `${song._id}`)

        songDetails.innerHTML = `
            <p>${song.title}</p>
            <p>${song.artist}</p>
            <p><a href="${song.link}">play song</a></p>
        `
        // somehow not appending child to the div as expected
        playlistShowContainer.appendChild(songDetails)

    })

    playlistShowContainer.appendChild(updatePlaylistButton)
}

// Form to update playlist
export const showEditPlaylistForm = (playlist) => {
    // hide the show container
    playlistShowContainer.classList.add('hide')
    // so the update form can come up
    playlistUpdateContainer.classList.remove('hide')

    // creating update form
    const updatePlaylistForm = document.createElement('div')
    // update form's playlist title
    updatePlaylistForm.innerHTML = `
        <form data-id="${playlist._id}">
            <input type="text" name="playlist-name" value="${playlist.name}">
            <button type="submit">Update name</button>
        </form>
    `
    const addSongToPlaylistForm = document.createElement('div')
    addSongToPlaylistForm.innerHTML = `
        <p>Add another song</p>
        <form id="playlist-add-song-form">
            <input type="text" name="song-title" placeholder="song title">
            <input type="text" name="song-artist" placeholder="artist">
            <input type="text" name="song-link" placeholder="song link">
            <input type="submit" value="create">
        </form>
    `
    // creating nested div for each playlist song
    
    if (playlist.songs.length > 0){
        playlist.songs.forEach(song => {
            const updatePlaylistSongForm = document.createElement('div')
            
            updatePlaylistSongForm.setAttribute("data-id", `${song._id}`)

            updatePlaylistSongForm.innerHTML = `
                <input type="text" name="playlist-song-title" value="${song.title}">
                <input type="text" name="playlist-song-artist" value="${song.artist}">
                <input type="text" name="playlist-song-link" value="${song.link}">
                <button type="button" data-id="${song._id}">Delete song</button>
            `
            updatePlaylistForm.appendChild(updatePlaylistSongForm)
        })
    }

    playlistUpdateContainer.appendChild(updatePlaylistForm)
    playlistUpdateContainer.appendChild(addSongToPlaylistForm)
}

// Update playlist
export const onUpdatePlaylistSuccess = (playlist) => {
    messageContainer.innerHTML = `
        Successfully updated playlist!
    `
}