'use client'

import ThemeRegistry from "@/theme/ThemeRegistry";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { SnackbarProvider } from "@/contexts/snackbar-context";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <ThemeProvider>
                <ThemeRegistry>
                    <SnackbarProvider>
                        {children}
                    </SnackbarProvider>
                </ThemeRegistry>
            </ThemeProvider>
        </AuthProvider>
    )
}