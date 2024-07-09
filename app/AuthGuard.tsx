'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/app/auth/auth';

type AuthGuardProps = {
    children: React.ReactNode;  // Define o tipo das props, onde children é um nó React que pode ser renderizado
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    useEffect(() => {
        if(!isAuthenticated()) {  // Verifica se o usuário não está autenticado
            router.push('/login');  // Redireciona para a página de login se não estiver autenticado
        }
    }, []);  // Executa este efeito apenas uma vez, após o montagem inicial do componente

    return <>{children}</>;  // Renderiza os filhos do componente AuthGuard
}