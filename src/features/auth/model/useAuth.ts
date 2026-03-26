import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../api/authApi'
import { useAuthStore } from './authStore'
import type { User } from './authStore'

export const useAuth = () => {
    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = async (username: string, password: string, remember: boolean) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await loginApi({ username, password })

            const user: User = {
                id: response.id,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                gender: response.gender,
                image: response.image,
            }

            setAuth(response.token, remember, user);

            navigate('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка авторизации')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        useAuthStore.getState().logout()
        navigate('/login')
    }

    return { login, logout, error, isLoading }
}