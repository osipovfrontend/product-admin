import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Pagination } from '@mui/material';

interface ProductTablePaginationProps {
    rowsPerPage: number;
    page: number;
    totalCount: number;
    totalPages: number;
    loading: boolean;
    onRowsPerPageChange: (value: number) => void;
    onPageChange: (page: number) => void;
}

export const ProductTablePagination = ({
    rowsPerPage,
    page,
    totalCount,
    totalPages,
    loading,
    onRowsPerPageChange,
    onPageChange
}: ProductTablePaginationProps) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
        }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Строк на стр.</InputLabel>
                <Select
                    value={rowsPerPage}
                    label="Строк на стр."
                    onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="body2" color="text.secondary">
                {totalCount === 0
                    ? '0 из 0'
                    : `Показано ${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalCount)} из ${totalCount}`}
            </Typography>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => onPageChange(newPage)}
                variant="outlined"
                shape="rounded"
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                disabled={totalCount === 0 || loading}
            />
        </Box>
    );
};