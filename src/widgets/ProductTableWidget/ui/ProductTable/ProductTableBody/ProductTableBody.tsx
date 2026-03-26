import type { Data } from '@/widgets/ProductTable/types';
import { TableBody, TableRow, TableCell, CircularProgress, Typography } from '@mui/material';
import { ProductTableRow } from '../ProductTableRow/ProductTableRow';

interface ProductTableBodyProps {
    data: Data[];
    loading: boolean;
    selected: readonly number[];
    searchQuery: string;
    onSelect: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
}

export const ProductTableBody = ({
    data,
    loading,
    selected,
    searchQuery,
    onSelect,
    onView,
    onEdit
}: ProductTableBodyProps) => {
    if (loading && data.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }}>Загрузка...</Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (data.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                        <Typography color="text.secondary">
                            {searchQuery ? 'Ничего не найдено' : 'Нет данных'}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody style={{ width: '100%' }}>
            {data.map((row, index) => (
                <ProductTableRow
                    key={row.id}
                    row={row}
                    index={index}
                    isSelected={selected.includes(row.id)}
                    onSelect={onSelect}
                    onView={onView}
                    onEdit={onEdit}
                />
            ))}
        </TableBody>
    );
};