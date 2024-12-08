import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { ProductRequest } from "../data/product/ProductRequest";

type Product = Database['public']['Tables']['products']['Row']

export async function createProduct({ name, purchasePrice, sellingPrice, stock, slug }: ProductRequest): Promise<Product> {
    const { data, error } = await supabase
        .from('products')
        .insert({
            name,
            purchase_price: purchasePrice,
            selling_price: sellingPrice,
            stock,
            slug,
        })
        .select()

    if (error) throw error

    return data[0] as Product
}