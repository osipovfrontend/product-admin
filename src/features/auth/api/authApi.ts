// src/features/auth/api/authApi.ts

export interface AuthResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
}

export interface LoginCredentials {
    username: string
    password: string
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Ошибка авторизации')
    }

    return response.json()
}