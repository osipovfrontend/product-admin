import { useState } from "react";
import type { NewProduct } from "../../types";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const AddProductDialog = ({
    open,
    onClose,
    onSuccess,
    onError,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (error: Error) => void;
}) => {
    const [formData, setFormData] =
        useState<NewProduct>({
            title: '',
            brand: '',
            sku: '',
            price: 0,
            category: '',
        });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        title?: string;
        brand?: string;
        sku?: string;
        price?: string;
    }>({});

    const validate = (): boolean => {
        const newErrors: {
            title?: string;
            brand?: string;
            sku?: string;
            price?: string;
        } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Введите наименование';
        }
        if (!formData.brand.trim()) {
            newErrors.brand = 'Введите вендора';
        }
        if (!formData.sku.trim()) {
            newErrors.sku = 'Введите артикул';
        }
        if (formData.price <= 0) {
            newErrors.price = 'Введите корректную цену';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении товара');
            }

            const result = await response.json();

            onSuccess();
            onClose();
            setFormData({ title: '', brand: '', sku: '', price: 0, category: 'beauty' });
            setErrors({});
        } catch (err) {
            onError(err instanceof Error ? err : new Error('Произошла ошибка'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof NewProduct) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === 'price' ? parseFloat(event.target.value) : event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Добавление нового товара
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Наименование"
                        value={formData.title}
                        onChange={handleChange('title')}
                        error={!!errors.title}
                        helperText={errors.title}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Вендор"
                        value={formData.brand}
                        onChange={handleChange('brand')}
                        error={!!errors.brand}
                        helperText={errors.brand}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Артикул"
                        value={formData.sku}
                        onChange={handleChange('sku')}
                        error={!!errors.sku}
                        helperText={errors.sku}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Цена ₽"
                        type="number"
                        value={formData.price || ''}
                        onChange={handleChange('price')}
                        error={!!errors.price}
                        helperText={errors.price}
                        required
                        slotProps={{
                            input: {
                                inputProps: { min: 0, step: 0.01 }
                            }
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};