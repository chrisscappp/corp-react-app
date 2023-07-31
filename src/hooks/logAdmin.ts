import { useState, useEffect } from 'react'
import { IUser } from '../models'
import { LOG_ADMIN } from '../utils/localStorageKeys'

export function useLogAdmin() {
    const [admin, setUser] = useState<IUser | object>({})
    const [error, setError] = useState<string>('')

    const obj = localStorage.getItem(LOG_ADMIN);

    useEffect(() => {
        if (obj) {
            setUser(JSON.parse(obj))
        } else {
            setError('No user')
            setUser({})
        }
    }, [])

    return { admin, error }
}