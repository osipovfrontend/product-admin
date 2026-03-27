import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Alert,
    CircularProgress,
    Stack,
    Link,
    Container,
} from '@mui/material'
import { useAuthStore } from '../model/authStore'

export const LoginForm = () => {
    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Ошибка авторизации')
            }

            const data = await response.json()

            const user = {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                image: data.image,
            }
            setAuth(data.token, remember, user)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка авторизации')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    borderRadius: 2,
                }}
            >
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                        Добро пожаловать
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Войдите в систему управления товарами
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Имя пользователя"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="emilys"
                            required
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        disabled={loading}
                                    />
                                }
                                label="Запомнить меня"
                            />
                            <Link
                                href="#"
                                variant="body2"
                                color="text.secondary"
                                sx={{ cursor: 'pointer' }}
                            >
                                Создать
                            </Link>
                        </Box>

                        {error && (
                            <Alert severity="error" variant="filled">
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
                        </Button>
                    </Stack>
                </form>

                <Box mt={3} textAlign="center">
                    <Typography variant="caption" color="text.secondary">
                        Тестовые данные: emilys / emilyspass
                    </Typography>
                </Box>
            </Paper>
        </Container>
    )
}