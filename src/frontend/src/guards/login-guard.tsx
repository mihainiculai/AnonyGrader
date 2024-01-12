"use client";

import { ReactNode, useEffect, useState, FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext, AuthContextType } from '@/contexts/auth-context';

interface AuthGuardProps {
    children: ReactNode;
}

export const LoginGuard: FC<AuthGuardProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthContext() as AuthContextType;
    const [checked, setChecked] = useState(false);

    useEffect(
        () => {
            if (isLoading) {
                return;
            }

            if (isAuthenticated) {
                console.log('Authenticated, redirecting to dashboard');
                router.push('/dashboard');
            } else {
                setChecked(true);
            }
        },
        [isAuthenticated, isLoading, router]
    );

    if (!checked) {
        return null;
    }

    return <>{children}</>;
};