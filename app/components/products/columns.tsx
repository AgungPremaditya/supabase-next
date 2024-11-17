"use client"

import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { ArrowsUpDownIcon, ArrowUpIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDownIcon } from "lucide-react";

type Product = Database['public']['Tables']['products']['Row']

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-4"
                >
                    Name
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon />
                    ) : (
                        <ArrowsUpDownIcon />
                    )}

                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button variant="link" className="p-4">
                        <a href="#">{row.getValue("name")}</a>
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: "purchase_price",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-4"
                    >
                        Purchase Price
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon />
                        ) : (
                            <ArrowsUpDownIcon />
                        )}

                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("purchase_price"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "selling_price",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-4"
                    >
                        Selling Price
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon />
                        ) : (
                            <ArrowsUpDownIcon />
                        )}

                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("selling_price"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-4"
                >
                    Stock
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon />
                    ) : (
                        <ArrowsUpDownIcon />
                    )}

                </Button>
            )
        },
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