"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Suspense } from "react"
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CardsProps {
    title: string
    description: string
    urlCreate: string
    children: React.ReactNode
}

export default function Cards({ title, description, urlCreate, children, }: CardsProps) {
    const pathName = usePathname()
    const isIndex = !pathName?.includes("/", 1)

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        {isIndex && (
                            <div>
                                <Button className="mb-4" asChild>
                                    <a href={urlCreate}>Add Product <PlusIcon /></a>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}