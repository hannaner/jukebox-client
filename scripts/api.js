import { store } from './store.js'

/* ------ Auth login/signup Actions ------ */
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

export const indexPlaylists = () => {
    return fetch(`http://localhost:8000/playlists`, {
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}