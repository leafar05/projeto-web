'use client';

import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/app/login/style3/produtos2.module.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import { logoutUser } from '@/app/auth/auth';
import AuthGuard from '@/app/AuthGuard';

export default function managerPage() {
    return (
        <AuthGuard>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className={styles.container}>
                    <h2 className='text-center pb-5'>Bem Vindo</h2>
                    <div className="row justify-content-center">
                        <a href="/login/inicial/create" className={`btn btn-primary bg-success mt-auto`} type='buuton'>Criar novos Produtos</a>
                        <a href="/login/inicial/editar" className={`btn btn-primary bg-success mt-3`} type='buuton'>Editar Produtos</a>
                        <button
                            onClick={logoutUser}
                            className="btn btn-danger bg-danger mt-3"
                            type="button">
                            Logout
                        </button>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </AuthGuard>
    )
}