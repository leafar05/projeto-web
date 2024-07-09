'use client'; // Assegura que o componente é tratado como Client Component

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/login/style3/produtos2.module.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import AuthGuard from '@/app/AuthGuard';

// Interface para o produto
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

// Interface para o pedido
interface Pedido {
    produtos: Produto[];
    nomePedido: string;
    telefone: string;
    total: number;
}

// Componente para exibir e gerenciar pedidos
const PedidosPage = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]); // Estado para armazenar a lista de pedidos

    // Efeito para buscar pedidos do localStorage quando o componente é montado
    useEffect(() => {
        const pedidosFromStorage = localStorage.getItem('pedidos');
        if (pedidosFromStorage) {
            setPedidos(JSON.parse(pedidosFromStorage));
        }
    }, []);

    // Função para finalizar um pedido
    const handleFinalizarPedido = (index: number) => {
        const novosPedidos = pedidos.filter((_, i) => i !== index);
        setPedidos(novosPedidos);
        localStorage.setItem('pedidos', JSON.stringify(novosPedidos));
        alert('Pedido finalizado com sucesso!');
    };

    // Função para cancelar um pedido
    const handleCancelarPedido = (index: number) => {
        const novosPedidos = pedidos.filter((_, i) => i !== index);
        setPedidos(novosPedidos);
        localStorage.setItem('pedidos', JSON.stringify(novosPedidos));
        alert('Pedido cancelado.');
    };

    return (
        <AuthGuard>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className={styles.container}>
                    <h2 className="text-center">Pedidos Recebidos</h2>
                    <a href="/login/inicial" className={`btn btn-primary bg-success mb-5`} type="button">Voltar</a>
                    <div className="row justify-content-center">
                        {pedidos.length > 0 ? (
                            <ul className="list-group">
                                {pedidos.map((pedido, index) => (
                                    <li key={index} className="list-group-item">
                                        <h5>Pedido #{index + 1}</h5>
                                        <p><strong>Nome:</strong> {pedido.nomePedido}</p>
                                        <p><strong>Telefone:</strong> {pedido.telefone}</p>
                                        <p><strong>Total:</strong> {pedido.total.toFixed(2)} EUR</p>
                                        <h6>Produtos:</h6>
                                        <ul>
                                            {pedido.produtos.map((produto, prodIndex) => (
                                                <li key={prodIndex}>{produto.attributes.nome} - {produto.attributes.preco} EUR</li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => handleFinalizarPedido(index)}
                                            className="btn btn-success mt-2"
                                            type="button"
                                        >
                                            Finalizar Pedido
                                        </button>
                                        <button
                                            onClick={() => handleCancelarPedido(index)}
                                            className="btn btn-danger mt-2"
                                            type="button"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Cancelar Pedido
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center">Nenhum pedido encontrado.</p>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </AuthGuard>
    );
};

export default PedidosPage;
