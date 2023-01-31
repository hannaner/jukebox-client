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

/** ---- attempt2 using forEach method ----  */   
    playlist.songs.forEach(song => {
        console.log(song)
        songDetails.setAttribute("data-id", `${song._id}`)
        console.log('attribute set')
        songDetails.innerHTML = `
            <p>${song.title}</p>
            <p>${song.artist}</p>
            <p><a href="${song.link}">play song</a></p>
        `
        console.log('end of setting innerhtml')

        // somehow not appending child to the div as expected
        playlistShowContainer.appendChild(songDetails)
        console.log('added to playlist')

    })

    playlistShowContainer.appendChild(updatePlaylistButton)
}

export const showEditPlaylistForm = (playlist) => {
    // hide the show container
    playlistShowContainer.classList.add('hide')
    // so the update form can come up
    playlistUpdateContainer.classList.remove('hide')
    console.log(playlist)
    // not sure why playlist is undefined
    
    // creating update form
    const updatePlaylistForm = document.createElement('div')
    // update form's playlist title
    updatePlaylistForm.innerHTML = `
        <form data-id="${playlist._id}">
            <input type="text" name="playlist-name" value="${playlist.name}">
        </form>
    `

    // creating nested div for each playlist song
    const playlistSong = document.createElement('div')

    // iterate through songs array and create child form
    if (playlist.songs.length > 0){
        playlist.songs.forEach(song => {
            playlistSong.setAttribute("data-id", `${song._id}`)

            playlistSong.innerHTML = `
                <input type="text" name="playlist-song-title" value="${song.title}">
                <input type="text" name="playlist-song-artist" value="${song.artist}">
                <input type="text" name="playlist-song-link" value="${song.link}">
                <button type="submit" data-id="${song._id}">Update song</button>
                <button type="button" data-id="${song._id}">Delete song</button>
            `
            updatePlaylistForm.appendChild(playlistSong)
        })
    }
}

// Update playlist
export const onUpdatePlaylistSuccess = (playlist) => {
/*
    // hide the show container
    playlistShowContainer.classList.add('hide')
    // so the update form can come up
    playlistUpdateContainer.classList.remove('hide')

    // creating update form
    const updatePlaylistForm = document.createElement('div')
    // update form's playlist title
    div.innerHTML = `
        <form data-id="${playlist._id}">
            <input type="text" name="playlist-name" value="${playlist.name}">
        </form>
    `

    // creating nested div for each playlist song
    const playlistSong = document.createElement('div')

    // iterate through songs array and create child form
    if (playlist.songs.length > 0){
        playlist.songs.forEach(song => {
            playlistSong.setAttribute("data-id", `${song._id}`)

            playlistSong.innerHTML = `
                <input type="text" name="playlist-song-title" value="${song.title}">
                <input type="text" name="playlist-song-artist" value="${song.artist}">
                <input type="text" name="playlist-song-link" value="${song.link}">
                <button type="submit" data-id="${song._id}">Update song</button>
                <button type="button" data-id="${song._id}">Delete song</button>
            `
            updatePlaylistForm.appendChild(playlistSong)
        })
    }
    */
    messageContainer.innerHTML = `
        Successfully updated playlist!
    `
}