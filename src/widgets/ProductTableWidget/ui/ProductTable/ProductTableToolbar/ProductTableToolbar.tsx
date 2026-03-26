import { Toolbar, Typography, Box, IconButton, Tooltip, Button, TextField, InputAdornment } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CircularProgress } from '@mui/material';
import s from './ProductTableToolbar.module.scss';

interface ProductTableToolbarProps {
    numSelected: number;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    loading: boolean;
    onDelete?: () => void;
    onResetSort?: () => void;
    onAddProduct: () => void;
    onRefresh?: () => void;
}

export const ProductTableToolbar = (props: ProductTableToolbarProps) => {
    const {
        numSelected,
        searchQuery,
        onSearchChange,
        loading,
        onDelete,
        onResetSort,
        onAddProduct,
        onRefresh
    } = props;

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearchChange(searchQuery);
        }
    };

    return (
        <>
            <Toolbar className={s.searchPanelWrapper} sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
            }}>
                <Typography variant="h6" component="div">
                    Товары
                </Typography>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ minWidth: 250 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: loading ? (
                                <InputAdornment position="end">
                                    <CircularProgress size={20} />
                                </InputAdornment>
                            ) : searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => onSearchChange('')}
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Toolbar>
            <Toolbar sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}>
                {numSelected > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                        Выбрано {numSelected} товаров
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
                        Все позиции
                    </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tooltip title="Обновить таблицу">
                        <IconButton onClick={onRefresh} size="small" disabled={loading}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>

                    {onResetSort && (
                        <Tooltip title="Сбросить сортировку">
                            <IconButton onClick={onResetSort} size="small">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    {numSelected > 0 && onDelete && (
                        <Tooltip title="Удалить">
                            <IconButton onClick={onDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddProduct}
                    className={s.addButton}
                    size='large'
                >
                    Добавить товар
                </Button>
            </Toolbar>
        </>
    );
};