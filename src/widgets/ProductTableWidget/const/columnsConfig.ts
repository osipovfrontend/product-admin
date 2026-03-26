import type { IColumnsConfig } from "../types";

export const columnsConfig: readonly IColumnsConfig[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Наименование',
        sortable: true,
    },
    {
        id: 'brand',
        numeric: false,
        disablePadding: false,
        label: 'Вендор',
        sortable: true,
    },
    {
        id: 'sku',
        numeric: false,
        disablePadding: false,
        label: 'Артикул',
        sortable: true,
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Оценка',
        sortable: true,
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Цена ₽',
        sortable: true,
    },
];