import { Header } from "@/shared/ui/Header/Header";
import { ProductTableWidget } from "@/widgets/ProductTableWidget";

import s from './ProductPage.module.scss'

export const ProductsPage = () => {
    return (
        <div className={s.productsPageWrapper}>
            <Header />
            <br />
            <ProductTableWidget />
        </div>
    );
}