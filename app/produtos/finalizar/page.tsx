'use client';

import { useEffect, useState } from 'react';
import styles from '../style2/produtos.module.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../header';
import Footer from '../../footer';

interface Produto {
    id: number;
    attributes: {
        nome: string;
        descricao: string;
        preco: string;
        disponivel: boolean;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export default function FinalizarPedidoPage() {
    const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
    const [nomePedido, setNomePedido] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        const savedProdutos = localStorage.getItem('selectedProdutos');
        if (savedProdutos) {
            setSelectedProdutos(JSON.parse(savedProdutos));
        }
    }, []);

    const handleFinalizarPedido = () => {
        if (nomePedido.trim() === '' || telefone.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        alert(`Pedido finalizado com sucesso!\nSr(a).: ${nomePedido}`);
        localStorage.removeItem('selectedProdutos');
        setSelectedProdutos([]);
        setNomePedido('');
        setTelefone('');
        window.location.href='/produtos';
    };

    const total = selectedProdutos.reduce((acc, produto) => acc + parseFloat(produto.attributes.preco), 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className={styles.container}>
                <h1 className={styles.header}>Finalizar Pedido</h1>
                {selectedProdutos.length > 0 ? (
                    <div className={styles.selectedContainer}>
                        <div className={styles.menus}>
                            <h2 className={styles.header}>Produtos Selecionados</h2>
                            <ul>
                                {selectedProdutos.map((produto) => (
                                    <li key={produto.id}>{produto.attributes.nome} - {produto.attributes.preco} EUR</li>
                                ))}
                            </ul>
                            <h3>Total: {total.toFixed(2)} EUR</h3><br />
                            <button
                                onClick={handleFinalizarPedido}
                                className={styles.formButton}
                                style={{ marginTop: '10px', backgroundColor: 'green', color: 'white' }}
                            >
                                Finalizar Pedido
                            </button>
                        </div>
                        <div className={styles.dados}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nomePedido" className={styles.formLabel}>Nome do Pedido:</label>
                                <input
                                    type="text"
                                    id="nomePedido"
                                    value={nomePedido}
                                    onChange={(e) => setNomePedido(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />

                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="telefone" className={styles.formLabel}>Número de Telefone:</label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    min={91}
                                    max={999999999}
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>Nenhum produto selecionado.</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}
