'use client';

import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/app/login/style3/produtos2.module.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/header';
import Footer from '@/app/footer';

export default function managerPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className={styles.container}>
                <div className="row justify-content-center">
                    <a href="/login/inicial/create" className={`btn btn-primary bg-success mt-auto`} type='buuton'>Criar novos Produtos</a>
                    <a href="/login/inicial/editar" className={`btn btn-primary bg-success mt-3`} type='buuton'>Editar novos Produtos</a>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}