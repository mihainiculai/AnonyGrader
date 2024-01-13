'use client'

import ThemeRegistry from "@/theme/ThemeRegistry";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { SnackbarProvider } from "@/contexts/snackbar-context";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <ThemeProvider>
                <ThemeRegistry>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <SnackbarProvider>
                            {children}
                        </SnackbarProvider>
                    </LocalizationProvider>
                </ThemeRegistry>
            </ThemeProvider>
        </AuthProvider>
    )
}