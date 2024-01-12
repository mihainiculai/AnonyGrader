"use client";

import { ReactNode, useEffect, useState, FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext, AuthContextType } from '@/contexts/auth-context';

interface TeachGuardProps {
    children: ReactNode;
}

export const TeachGuard: FC<TeachGuardProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const { isLoading, user } = useAuthContext() as AuthContextType;
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return;
        }


        if (user?.roleId !== 2) {
            setChecked(false);
            console.log('Not a teacher, redirecting');
            router.push('/dashboard');
        } else {
            setChecked(true);
        }
    }, [user, isLoading, router]);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
};