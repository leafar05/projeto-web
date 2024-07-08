// src/components/Header.tsx
import React from 'react';

const Header = () => {
    return (
        <header className="bg-success text-white text-center p-3 min-vw-100">
            <div className="container d-flex justify-content-between">
                <h1>Delícias na Roda</h1>

                <div className="d-flex">
                    <a href="/.." className="btn btn-outline-light" type="button">Voltar</a>
                    <a href="/login" className="btn btn-outline-light ms-4" type="button">Login</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
