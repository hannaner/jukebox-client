import { store } from './store.js'

/* ------ Auth login/signup Actions ------ */
// sign up
export const signup = (data) => {
    return fetch(`http://localhost:8000/sign-up`, 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// login
export const login = (data) => {
    return fetch(`http://localhost:8000/login`, 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

/* ------ Playlist Actions ------ */
// create playlist
export const createPlaylist = (data) => {
    return fetch(`http://localhost:8000/playlists`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

// index playlist belonging to user
export const indexPlaylists = () => {
    return fetch(`http://localhost:8000/playlists`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}

// show single playlist
export const showPlaylist = (playlistId) => {
    return fetch(`http://localhost:8000/playlists/${playlistId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}

// update single playlist
export const updatePlaylist = (data, playlistId) => {
	return fetch(`http://localhost:8000/playlists/${playlistId}`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`,
		},
		body: JSON.stringify(data),
	})
}

