import { supabase } from "@/lib/supabase";

export async function deleteProduct(id: number): Promise<void> {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

    if (error) throw error
    
}
