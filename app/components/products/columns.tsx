"use client"

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react";
type Product = Database['public']['Tables']['products']['Row']

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button variant="link" className="p-0">
                        <a href="#">{row.getValue("name")}</a>
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: () => {
            return (
                <div className="flex gap-2">
                    <Button size="icon" variant="destructive">
                        <TrashIcon />
                    </Button>
                    <Button size="icon">
                        <PencilSquareIcon />
                    </Button>
                </div>
            )
        }
    }
]