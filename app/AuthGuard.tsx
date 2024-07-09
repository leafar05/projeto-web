'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/app/auth/auth';

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated()) {
            router.push('/login');
        }
    }, []);
    return <>{children}</>
}

