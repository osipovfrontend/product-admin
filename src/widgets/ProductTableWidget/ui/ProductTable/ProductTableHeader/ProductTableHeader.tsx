
import { columnsConfig } from '@/widgets/ProductTableWidget/const/columnsConfig';
import type { Data, EnhancedTableProps } from '@/widgets/ProductTableWidget/types';
import { TableHead, TableRow, TableCell, Checkbox, Box } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

export const ProductTableHeader = (props: EnhancedTableProps) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {columnsConfig.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        {column.sortable ? (
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                                {orderBy === column.id && (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                )}
                            </TableSortLabel>
                        ) : (
                            column.label
                        )}
                    </TableCell>
                ))}
                <TableCell align="center">Действия</TableCell>
            </TableRow>
        </TableHead>
    );
};