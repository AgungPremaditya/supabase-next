"use client";

import Cards from "@/app/components/general/cards";
import { ProductForm } from "@/app/components/products/forms"
import { ProductRequest } from "@/lib/data/product/ProductRequest";
import { getProductDetail } from "@/lib/product/getProductDetail";
import { use, useEffect, useState } from "react";


export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const [product, setProduct] = useState<ProductRequest | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetail(resolvedParams.id);
                setProduct({
                    id: data.id,
                    name: data.name,
                    purchasePrice: data.purchase_price,
                    sellingPrice: data.selling_price,
                    stock: data.stock
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [resolvedParams.id]);

    if (loading) return <div>Loading...</div>
    return (
        <div className="container px-6 py-4">
            <Cards title="Edit Product" description="Edit a product" >
                <ProductForm data={product} isEdit={true} />
            </Cards>
        </div>
    );
}