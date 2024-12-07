import Cards from "@/app/components/general/cards";
import { ProductForm } from "@/app/components/products/forms";

export default function CreateProduct() {
    return (
        <div className="container px-6 py-4">
            <Cards title="Create Product" description="Create a new product" >
                <ProductForm />
            </Cards>
        </div>
    )
}