export interface Data {
    id: number;
    name: string;
    category: string;
    brand: string;
    sku: string;
    rating: number;
    price: number;
    thumbnail: string;
}

export interface NewProduct {
    title: string;
    brand: string;
    sku: string;
    price: number;
    category?: string;
}

export interface IColumnsConfig {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
    onDelete?: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    loading: boolean;
    onResetSort?: () => void;
    onAddProduct: () => void;
    onRefresh?: () => void;  // Добавляем пропс
}