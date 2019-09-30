import {
    FETCH_LOGIN,
    LOGOUT
} from './types'

export function getLoggedIn(username, password) {
    return {
        type: FETCH_LOGIN,
        "username": username,
        "password": password
    }
}

export function logout() {
    return {
        type: LOGOUT,
        "username": '',
        "password": ''
    }
}
