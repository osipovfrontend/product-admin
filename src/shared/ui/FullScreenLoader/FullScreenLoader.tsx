import { Box, CircularProgress } from "@mui/material";

export const FullScreenLoader = () => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
    >
        <Box textAlign="center">
            <CircularProgress size={48} />
            <Box mt={2} color="text.secondary">
                Загрузка...
            </Box>
        </Box>
    </Box>
)