import { TableRow, TableCell, Checkbox, Stack, Avatar, Box, Typography, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { CategoryText } from '../../CategoryText/CategoryText';
import { RatingCell } from '../../RatingCell/RatingCell';
import type { Data } from '@/widgets/ProductTableWidget/types';

import s from './ProductTableRow.module.scss';

interface ProductTableRowProps {
    row: Data;
    index: number;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
}

export const ProductTableRow = ({ row, index, isSelected, onSelect, onView, onEdit }: ProductTableRowProps) => {
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
        <TableRow
            hover
            onClick={() => onSelect(row.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={row.id}
            selected={isSelected}
            sx={{ cursor: 'pointer' }}
            className={`${s.rowWrapper} ${isSelected ? s.rowWrapperActive : ''}`}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isSelected}
                    slotProps={{
                        input: { 'aria-labelledby': labelId }
                    }}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                        src={row.thumbnail}
                        alt={row.name}
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                        <Typography variant="body2" fontWeight={500}>
                            {row.name}
                        </Typography>
                        <CategoryText category={row.category} />
                    </Box>
                </Stack>
            </TableCell>
            <TableCell>{row.brand || '—'}</TableCell>
            <TableCell>{row.sku}</TableCell>
            <TableCell align="right">
                <RatingCell rating={row.rating} />
            </TableCell>
            <TableCell align="right">
                <Typography variant="body2" fontWeight={500}>
                    {row.price.toLocaleString('ru-RU')} ₽
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Tooltip title="Просмотр">
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(row.id);
                        }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Редактировать">
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row.id);
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};