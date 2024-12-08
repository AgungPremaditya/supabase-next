import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Product = Database['public']['Tables']['products']['Row']

export async function getProductDetail(slug: string): Promise<Product> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error

    return data as Product
}