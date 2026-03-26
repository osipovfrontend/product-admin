import React, { useState, useCallback } from 'react';
import { Paper, Alert, Button, Box, Snackbar, TableContainer, Table } from '@mui/material';
import s from './ProductTableWidget.module.scss';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Data, Order } from '../types';
import { STORAGE_KEYS } from '../const/storageKeys';
import { useProductData } from '../hooks/useProductData';
import { useProductSelection } from '../hooks/useProductSelection';
import { productsApi } from '../api/productsApi';
import { AddProductDialog } from './AddProductDialog/AddProductDialog';
import { ProductTableToolbar } from './ProductTable/ProductTableToolbar/ProductTableToolbar';
import { ProductTableHeader } from './ProductTable/ProductTableHeader/ProductTableHeader';
import { ProductTableBody } from './ProductTable/ProductTableBody/ProductTableBody';
import { ProductTablePagination } from './ProductTable/ProductTablePagination/ProductTablePagination';

export const ProductTableWidget = () => {
    const [order, setOrder] = useLocalStorage<Order>(STORAGE_KEYS.SORT_ORDER, 'asc');
    const [orderBy, setOrderBy] = useLocalStorage<keyof Data>(STORAGE_KEYS.SORT_BY, 'name');
    const [rowsPerPage, setRowsPerPage] = useLocalStorage<number>(STORAGE_KEYS.ROWS_PER_PAGE, 5);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const {
        data,
        loading,
        error,
        totalCount,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        loadProducts
    } = useProductData({ rowsPerPage, order, orderBy });

    const {
        selected,
        handleSelectAllClick,
        handleClick,
        clearSelection
    } = useProductSelection();

    const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(1);
    };

    const handleResetSort = () => {
        setOrder('asc');
        setOrderBy('name');
        setPage(1);
    };

    const handleDelete = useCallback(async () => {
        if (selected.length === 0) return;

        try {
            await Promise.all(selected.map(id => productsApi.deleteProduct(id)));

            const newTotalCount = totalCount - selected.length;
            clearSelection();
            await loadProducts(searchQuery, 0);

            const newTotalPages = Math.ceil(newTotalCount / rowsPerPage);
            if (page > newTotalPages && newTotalPages > 0) {
                setPage(newTotalPages);
            }

            setSnackbar({
                open: true,
                message: `Удалено ${selected.length} товаров`,
                severity: 'success',
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Ошибка при удалении',
                severity: 'error',
            });
        }
    }, [selected, totalCount, rowsPerPage, page, loadProducts, searchQuery, clearSelection, setPage]);

    const handleAddProductSuccess = async () => {
        await loadProducts(searchQuery, (page - 1) * rowsPerPage);
        setSnackbar({
            open: true,
            message: 'Товар успешно добавлен',
            severity: 'success',
        });
    };

    const handleRefresh = useCallback(async () => {
        setPage(1);
        await loadProducts(searchQuery, 0);
        setSnackbar({
            open: true,
            message: 'Таблица обновлена',
            severity: 'success',
        });
    }, [loadProducts, searchQuery, setPage]);

    const handleView = (id: number) => {
        const product = data.find(item => item.id === id);
        console.log('Просмотр товара:', product);
    };

    const handleEdit = (id: number) => {
        const product = data.find(item => item.id === id);
        console.log('Редактирование товара:', product);
    };

    if (error) {
        return (
            <Box sx={{ width: '100%', p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                <Button variant="contained" onClick={() => loadProducts(searchQuery, (page - 1) * rowsPerPage)}>
                    Повторить
                </Button>
            </Box>
        );
    }

    return (
        <Paper elevation={1} className={s.productTableWrapper}>
            <ProductTableToolbar
                numSelected={selected.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                loading={loading}
                onDelete={handleDelete}
                onResetSort={handleResetSort}
                onAddProduct={() => setDialogOpen(true)}
                onRefresh={handleRefresh}
            />

            <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                <Table
                    sx={{ minWidth: 750, width: '100%' }}
                    aria-labelledby="tableTitle"
                    size='medium'
                    stickyHeader
                >

                    <ProductTableHeader
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={(event: any) => handleSelectAllClick(data, event.target.checked)}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                    />

                    <ProductTableBody
                        data={data}
                        loading={loading}
                        selected={selected}
                        searchQuery={searchQuery}
                        onSelect={handleClick}
                        onView={handleView}
                        onEdit={handleEdit}
                    />

                </Table>
            </TableContainer>

            <ProductTablePagination
                rowsPerPage={rowsPerPage}
                page={page}
                totalCount={totalCount}
                totalPages={Math.ceil(totalCount / rowsPerPage)}
                loading={loading}
                onRowsPerPageChange={setRowsPerPage}
                onPageChange={setPage}
            />

            <AddProductDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={handleAddProductSuccess}
                onError={(error) => setSnackbar({
                    open: true,
                    message: error.message,
                    severity: 'error'
                })}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};