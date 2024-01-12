"use client";
import { TeachGuard } from "@/guards/teach-guard";

export default function TeachLayout({ children }: { children: React.ReactNode; }) {
    return (
        <TeachGuard>
            {children}
        </TeachGuard>
    );
}