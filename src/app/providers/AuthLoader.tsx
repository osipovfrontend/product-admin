import { useEffect } from 'react'
import { useAuthStore } from '../../features/auth'

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const loadFromStorage = useAuthStore((state) => state.loadFromStorage)
    const isLoading = useAuthStore((state) => state.isLoading)

    useEffect(() => {
        loadFromStorage()
    }, [loadFromStorage])

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #3B82F6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }} />
                    <p style={{ marginTop: 16, color: '#666' }}>Загрузка...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
        )
    }

    return <>{children}</>
}