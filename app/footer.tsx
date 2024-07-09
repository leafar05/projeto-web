// src/components/Header.tsx
import React from 'react';

const Footer = () => {
    return (
        <header className="bg-success text-white d-flex align-items-center text-center p-3 min-vw-100 ">
            <div className="container d-flex flex-column">
                <h2>Contacto:</h2>
                <p>email: aluno26254@ipt.pt</p>
                <p>email: aluno26178@ipt.pt</p>
            </div>
            <div className='container'>
                <h2>Colaboradores:</h2>
                <p>Luiz Espinola nº26254 e Rafael Santos nº26178</p>
            </div>
        </header >
    );
};

export default Footer;