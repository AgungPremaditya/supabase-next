"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductRequest } from "@/lib/data/product/ProductRequest";
import { createProduct } from "@/lib/product/createProduct";
import { updateProduct } from "@/lib/product/updateProduct";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, {
        message: "Name is required",
    }),
    purchasePrice: z.preprocess(Number, z.number().min(0, {
        message: "Price is required",
    })),
    sellingPrice: z.preprocess(Number, z.number().min(0, {
        message: "Price is required",
    })),
    stock: z.preprocess(Number, z.number().min(0, {
        message: "Stock is required",
    })),
    slug: z.string().optional(),
})

interface ProductFormProps {
    data?: ProductRequest
    isEdit?: boolean
}

export function ProductForm({ data, isEdit }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: isEdit ? data?.id ?? "" : "",
            name: isEdit ? data?.name ?? "" : "",
            purchasePrice: isEdit ? data?.purchasePrice ?? 0 : 0,
            sellingPrice: isEdit ? data?.sellingPrice ?? 0 : 0,
            stock: isEdit ? data?.stock ?? 0 : 0,
            slug: isEdit ? data?.slug ?? "" : "",
        },
    });

    const nameValue = form.watch("name");
    useEffect(() => {
        const slug = nameValue
            ?.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        form.setValue("slug", slug);
    }, [nameValue, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            if (isEdit) {
                const product = await updateProduct(values)
                console.log(product)
            } else {
                const product = await createProduct(values)
                console.log(product)
            }

            // Redirect to products page
            router.push("/products")
            router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="pr-32 flex flex-col gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input readOnly placeholder="Product Slug" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="purchasePrice"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Purchase Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Product Purchase Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sellingPrice"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Selling Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Selling Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Stock" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        {isLoading ? (
                            <Button disabled>
                                Please Wait
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </Button>
                        ) : (

                            <Button type="submit" className="align-right">
                                {isEdit ? "Update" : "Create"}
                                {isEdit ? <PencilSquareIcon /> : <PlusIcon />}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}