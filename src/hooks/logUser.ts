import { useState, useEffect } from 'react'
import { IUser } from '../models'
import { LOG_USER } from '../utils/localStorageKeys'

export function useLogUser() {
    const [user, setUser] = useState<IUser | object>({})
    const [error, setError] = useState<string>('')

    const obj = localStorage.getItem(LOG_USER);

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