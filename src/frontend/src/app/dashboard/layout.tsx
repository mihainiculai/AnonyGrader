"use client";
import { Layout } from "@/layouts/dashboard/layout";
import { AuthGuard } from "@/guards/auth-guard";
import { Box, Container, Stack } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return (
        <AuthGuard>
            <Layout>
                <main>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            py: 8
                        }}
                    >
                        <Container maxWidth="xl">
                            <Stack spacing={3}>
                                {children}
                            </Stack>
                        </Container>
                    </Box>
                </main>
            </Layout>
        </AuthGuard>
    );
}