export type ProductRequest = {
    id?: string;
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    stock: number;
    slug?: string;
}