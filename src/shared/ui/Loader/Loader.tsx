import { Box, CircularProgress, Typography } from '@mui/material'

interface LoaderProps {
    fullScreen?: boolean
    message?: string
}

export const Loader = ({ fullScreen = true, message = 'Загрузка...' }: LoaderProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight={fullScreen ? '100vh' : 'auto'}
            py={fullScreen ? 0 : 4}
        >
            <CircularProgress size={40} />
            {message && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Box>
    )
}