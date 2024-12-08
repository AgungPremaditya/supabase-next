"use client"

import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

export function Navigation() {
    const pathname = usePathname();

    const paths = [
        {
            href: '/',
            label: 'Home',
            key: 'home'
        },
        ...pathname
            .split('/')
            .filter(path => path !== '')
            .map((segment, index) => ({
                href: `/${segment}`,
                label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ''),
                key: `${segment}-${index}`
            }))
    ]

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, index) => (
                    <React.Fragment key={path.key}>
                        {index > 0 && (
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                        <BreadcrumbItem key={path.key}>
                            {index === paths.length - 1 ? (
                                <BreadcrumbPage>{path.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={path.href}>{path.label}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}