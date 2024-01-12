import { Layout } from "@/layouts/auth/layout";
import { LoginGuard } from "@/guards/login-guard";

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return (
        <LoginGuard>
            <Layout>
                {children}
            </Layout>
        </LoginGuard>
    );
}