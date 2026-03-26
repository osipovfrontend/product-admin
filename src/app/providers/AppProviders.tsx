import { AuthLoader } from './AuthLoader'

interface AppProvidersProps {
    children: React.ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <AuthLoader>
            {children}
        </AuthLoader>
    )
}