'use client';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/login/style3/produtos2.module.css'; 
import Header from '@/app/header'; 
import Footer from '@/app/footer'; 
import { loginUser } from '@/app/auth/auth';
import AuthGuard from '@/app/AuthGuard';

export default function LoginPage() {
    //Armazenamento de dados
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Função para lidar com o login do usuário
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginUser(email, password); // Tenta fazer login com as credenciais fornecidas
            window.location.href = '/login/inicial'; // Redireciona para a página inicial após o login bem-sucedido
        } catch (err) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <AuthGuard>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className={styles.container}>
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </form>
                </div>
                <Footer />
            </div>
        </AuthGuard>
    );
}
