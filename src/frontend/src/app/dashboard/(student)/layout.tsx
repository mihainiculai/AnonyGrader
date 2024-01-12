"use client";
import { StudGuard } from "@/guards/stud-guard";

export default function TeachLayout({ children }: { children: React.ReactNode; }) {
    return (
        <StudGuard>
            {children}
        </StudGuard>
    );
}