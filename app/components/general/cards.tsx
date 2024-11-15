"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react"

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
                    <CardTitle>{ title }</CardTitle>
                    <CardDescription>{ description }</CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        { children }
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}