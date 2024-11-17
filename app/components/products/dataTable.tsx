"use client"

import {
    ColumnDef,
    SortingState,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import { SortField } from "@/lib/product/getProduct"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    count: number
    onPageChange: (page: number) => void
    currentPage: number
    pageSize: number
    onSortingChange: (field: SortField, order: 'asc' | 'desc') => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    count,
    onPageChange,
    currentPage,
    pageSize,
    onSortingChange
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(count / pageSize),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater
            setSorting(newSorting)
            if (newSorting.length > 0) {
                onSortingChange(newSorting[0].id as SortField, newSorting[0].desc ? 'desc' : 'asc')
            }
        },
        state: {
            pagination: {
                pageIndex: currentPage - 1,
                pageSize,
            },
            sorting
        }
    })

    const totalPages = Math.ceil(count / pageSize)



    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon />
                </Button>
                <div className="text-sm">
                    Page {currentPage} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>

    )
}