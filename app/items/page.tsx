import { getProducts } from "@/lib/product/getProduct";
import { DataTable } from "../components/products/dataTable";
import { columns } from "../components/products/columns";

import Cards from "../components/general/cards";

export default async function Page() {
    const products = await getProducts();

    return (
        <div className="container py-12 place-content-center">
            <Cards title="Products" description="Manage your products">
                <DataTable columns={columns} data={products} />
            </Cards>
        </div>
    )
}