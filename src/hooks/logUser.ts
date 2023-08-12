import { useState, useEffect } from 'react'
import { IUser } from '../models'
import { LOG_USER } from '../utils/localStorageKeys'

export function useLogUser() {
    const [user, setUser] = useState<IUser | object>({})
    const [error, setError] = useState<string>('')

    const obj = localStorage.getItem(LOG_USER)

    // в лс токен, по токену ищем в массиве юсеров, который передали извне

    useEffect(() => {
        if (obj) {
            setUser(JSON.parse(obj))
        } else {
            setError('No user')
            setUser({})
        }
    }, [])

    return { user, error }
}