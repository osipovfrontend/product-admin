import { Routes, Route, Navigate, HashRouter, BrowserRouter } from 'react-router-dom'
import { useAuthStore } from '../../features/auth'
import { LoginPage } from '../../pages/LoginPage/LoginPage'
import { ProductsPage } from '../../pages/ProductsPage/ProductsPage'
import { useEffect, useState } from 'react'
import { FullScreenLoader } from '@/shared/ui/FullScreenLoader/FullScreenLoader'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const isLoading = useAuthStore((state) => state.isLoading)

    if (isLoading) {
        return <FullScreenLoader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export function AppRouter() {
    const isLoading = useAuthStore((state) => state.isLoading)
    const loadFromStorage = useAuthStore((state) => state.loadFromStorage)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const initAuth = async () => {
            await loadFromStorage()
            setIsInitialized(true)
        }

        initAuth()
    }, [loadFromStorage])

    if (!isInitialized || isLoading) {
        return <FullScreenLoader />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <ProductsPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}