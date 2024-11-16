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

interface CardsProps {
    title: string
    description: string
    children: React.ReactNode
}

export default function Cards({ title, description, children }: CardsProps) {
    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </div>
                        <div>
                            <Button className="mb-4">Add Product <PlusIcon /></Button>
                        </div>
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