'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style2/produtos.module.css'; // Importa o arquivo CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header';
import Footer from '../footer';

// Interface para representar um Produto
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

export default function ProdutoPage() {
    // Estados para armazenar os valores dos campos do formulário
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);

    // useEffect para buscar os produtos ao carregar a página
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get<{ data: Produto[] }>('http://localhost:1337/api/produtos?populate=imagem');
                setProdutos(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    // Função para selecionar ou remover um produto da lista de selecionados
    const handleSelectProduto = (produto: Produto) => {
        setSelectedProdutos((prevSelectedProdutos) => {
            const isSelected = prevSelectedProdutos.some((p) => p.id === produto.id);
            const newSelectedProdutos = isSelected
                ? prevSelectedProdutos.filter((p) => p.id !== produto.id)
                : [...prevSelectedProdutos, produto];

            localStorage.setItem('selectedProdutos', JSON.stringify(newSelectedProdutos)); // Salva os produtos selecionados no localStorage
            return newSelectedProdutos;
        });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className={styles.container}>
                <h1 className={styles.header}>Lista de Produtos</h1>
                <a href="/produtos/finalizar" type='button' className={`btn btn-success`}>Finalizar Pedido</a><br />
                <a href="/" type='button' className={`btn btn-success mb-2`}>Voltar</a>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <div className={styles.cardContainer}>
                        {Array.isArray(produtos) && produtos.map((produto) => (
                            <div key={produto.id} className="card col-md-3 p-2">
                                <h2 className={styles.cardTitle}>{produto.attributes.nome}</h2>
                                <p className={styles.cardDescription}>{produto.attributes.descricao}</p>
                                <p className={styles.cardPrice}>Preço: {produto.attributes.preco} EUR</p><br />
                                <p className={styles.cardAvailability} style={{ color: produto.attributes.disponivel ? 'green' : 'red' }}>
                                    Disponível: {produto.attributes.disponivel ? 'Sim' : 'Não'}
                                </p>
                                {produto.attributes.disponivel && (
                                    <button
                                        onClick={() => handleSelectProduto(produto)}
                                        className={`btn mt-auto`}
                                        style={{ color: 'white', marginTop: '10px', backgroundColor: selectedProdutos.some(p => p.id === produto.id) ? 'red' : 'green' }}
                                    >
                                        {selectedProdutos.some(p => p.id === produto.id) ? 'Remover' : 'Selecionar'}
                                    </button>
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
