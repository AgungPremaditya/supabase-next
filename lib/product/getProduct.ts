import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Product = Database['public']['Tables']['products']['Row']

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw error

    return data as Product[]
}
