'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from '@/app/login/style3/produtos2.module.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/header';
import Footer from '@/app/footer';

export default function CriarProdutoPage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [disponivel, setDisponivel] = useState(false); // Estado para disponibilidade

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/produtos', {
        data: {
          nome,
          descricao,
          preco,
          disponivel, // Inclui o estado de disponibilidade
        },
      });

      console.log('Produto criado:', response.data);
      // Limpar os campos após a criação do produto
      setNome('');
      setDescricao('');
      setPreco('');
      setDisponivel(false); // Reseta a disponibilidade
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Criar Produto</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            <button type="button" onClick={() => setDisponivel(!disponivel)} className={`btn btn-primary bg-success mt-auto`}>
              {disponivel ? 'Sim' : 'Não'}
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className={`btn btn-primary bg-success mt-auto`}>Criar Produto</button>
            <div className='d-flex'>
              <a href="/login/inicial" className={`btn btn-primary bg-success mt-auto`} type='buuton'>Voltar aos menus</a>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
