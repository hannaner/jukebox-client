import { store } from './store.js'

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