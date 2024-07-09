'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/app/login/style3/produtos2.module.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/header';
import Footer from '@/app/footer';

interface Produto {
    id: number;
    attributes: {
        nome: string;
        descricao: string;
        preco: string;
        disponivel: boolean;
    };
}

export default function EditarProdutoPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [disponivel, setDisponivel] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get<{ data: Produto[] }>('http://localhost:1337/api/produtos');
                setProdutos(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleEdit = (produto: Produto) => {
        setEditandoId(produto.id);
        setNome(produto.attributes.nome);
        setDescricao(produto.attributes.descricao);
        setPreco(produto.attributes.preco);
        setDisponivel(produto.attributes.disponivel);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:1337/api/produtos/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
            console.error('Erro ao excluir o produto:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:1337/api/produtos/${id}`, {
                data: {
                    nome,
                    descricao,
                    preco,
                    disponivel,
                },
            });

            console.log('Produto atualizado:', response.data);
            setProdutos(produtos.map(prod => (prod.id === id ? response.data.data : prod)));
            setEditandoId(null);
            setNome('');
            setDescricao('');
            setPreco('');
            setDisponivel(false);
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className={styles.container}>
                <h1 className={styles.header}>Editar Produto</h1>
                <a href="/login/inicial" className={`btn btn-primary bg-success`} type='buuton'>Voltar</a><br />
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className={styles.cardContainer}>
                        {produtos.map((produto) => (
                            <div key={produto.id} className="card col-md-3 p-2">
                                {editandoId === produto.id ? (
                                    <form onSubmit={(e) => handleSubmit(e, produto.id)} className={styles.form}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="nome" className={styles.formLabel}>Nome:</label>
                                            <input
                                                type="text"
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                                className={styles.formInput}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="descricao" className={styles.formLabel}>Descrição:</label>
                                            <textarea
                                                id="descricao"
                                                value={descricao}
                                                onChange={(e) => setDescricao(e.target.value)}
                                                required
                                                className={styles.formTextarea}
                                            ></textarea>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="preco" className={styles.formLabel}>Preço:</label>
                                            <input
                                                type="number"
                                                id="preco"
                                                step="0.01"
                                                value={preco}
                                                onChange={(e) => setPreco(e.target.value)}
                                                required
                                                className={styles.formInput}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="disponivel" className={styles.formLabel}>Disponível:</label>
                                            <button type="button" onClick={() => setDisponivel(!disponivel)} className={`btn btn-primary bg-success mt-auto px-4`}>
                                                {disponivel ? 'Sim' : 'Não'}
                                            </button>
                                        </div>
                                        <div className="d-flex mt-auto justify-content-between">
                                            <button type="submit" className={`btn btn-primary bg-success mt-auto`}>Atualizar Produto</button>
                                            <div className="d-flex">
                                                <button type="button" onClick={() => setEditandoId(null)} className={`btn btn-primary bg-success mt-auto`}>Cancelar</button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h2 className={styles.cardTitle}>{produto.attributes.nome}</h2>
                                        <p className={styles.cardDescription}>{produto.attributes.descricao}</p>
                                        <p className={styles.cardPrice}>Preço: {produto.attributes.preco} EUR</p>
                                        <p className={styles.cardAvailability} style={{ color: produto.attributes.disponivel ? 'green' : 'red' }}>
                                            Disponível: {produto.attributes.disponivel ? 'Sim' : 'Não'}
                                        </p>
                                        <div className={`d-flex justify-content-between mt-auto ${styles['button-container']}`}>
                                            <button onClick={() => handleEdit(produto)} className="btn btn-primary bg-success px-5 mb-2">Editar</button>
                                            <div className={`d-flex ${styles['button-container']}`}>
                                                <button onClick={() => handleDelete(produto.id)} className="btn btn-primary bg-success px-5 mb-2" style={{ marginLeft: '0', backgroundColor: 'red', color: 'white' }}>Excluir</button>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
