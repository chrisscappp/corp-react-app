import { useState, useEffect } from 'react'
import { IAdmin } from '../models'
import { LOG_ADMIN } from '../utils/localStorageKeys'

export function useLogAdmin() {
    const [admin, setUser] = useState<IAdmin | object>({})
    const [error, setError] = useState<string>("")

    const obj = localStorage.getItem(LOG_ADMIN)

    useEffect(() => {
        if (obj) {
            setUser(JSON.parse(obj))
        } else {
            setError('No user')
            setUser({})
        }
    }, [])

    // переписать, храня в локал стораж токен, а в хук передать массив и там искать

    return { admin, error }
}