import { Typography } from "@mui/material";

export const CategoryText = ({ category }: { category: string }) => {
    const categoryMap: Record<string, string> = {
        'beauty': 'Косметика',
        'fragrances': 'Парфюмерия',
        'furniture': 'Мебель',
        'groceries': 'Продукты',
        'smartphones': 'Смартфоны',
        'laptops': 'Ноутбуки',
        'skincare': 'Уход за кожей',
        'home-decoration': 'Декор',
    };

    const displayCategory = categoryMap[category] || category;

    return (
        <Typography
            variant="caption"
            sx={{
                fontSize: '0.7rem',
                fontWeight: 500,
                display: 'block',
                mt: 0.5,
                color: 'text.secondary',
            }}
        >
            {displayCategory}
        </Typography>
    );
};