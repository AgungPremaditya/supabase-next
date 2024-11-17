import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Product = Database['public']['Tables']['products']['Row']
export type SortField = 'name' | 'purchase_price' | 'selling_price' | 'stock' | 'created_at'

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw error

    return data as Product[]
}

export async function paginations(
    page: number = 1, 
    limit: number = 3,
    sort: SortField = 'created_at',
    order: 'asc' | 'desc' = 'asc'
): Promise<{ products: Product[], count: number }>  {
    const from = (page - 1) * limit
    const to = page * limit - 1

    console.log(sort, order, "getProducts")

    const [products, count] = await Promise.all([
        supabase
            .from('products')
            .select('*')
            .order(sort, { ascending: order === 'asc' })
            .range(from, to),
        supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
    ])

    if (products.error) throw products.error

    console.log(products.data)

    return {
        products: products.data as Product[],
        count: count.count || 0
    }
}