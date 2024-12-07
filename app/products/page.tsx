"use client"

import { paginations, SortField } from "@/lib/product/getProduct";
import { DataTable } from "../components/products/dataTable";
import { columns } from "../components/products/columns";
import { Database } from "@/types/supabase";

import Cards from "../components/general/cards";
import { useCallback, useEffect, useState } from "react";

type Product = Database['public']['Tables']['products']['Row']

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [sortField, setSortField] = useState<SortField>('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const pageSize = 10

    const fetchProducts = useCallback(async () => {
        const data = await paginations(currentPage, pageSize, sortField, sortOrder);
        setProducts(data.products)
        setTotalCount(data.count)
    }, [currentPage, pageSize, sortField, sortOrder])


    useEffect(() => {
        fetchProducts()
    }, [currentPage, sortField, sortOrder, fetchProducts])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleSorting = (field: SortField, order: 'asc' | 'desc') => {
        setSortField(field)
        setSortOrder(order)
    }

    return (
        <div>
            <Cards title="Products" description="Manage your products" urlCreate="/products/create" >
                <DataTable
                    columns={columns}
                    data={products}
                    count={totalCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onSortingChange={handleSorting}
                />
            </Cards>
        </div >
    )
}
