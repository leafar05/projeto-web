import axios from 'axios';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

// Função para autenticar o usuário com nome de usuário e senha
export const loginUser = async (username, password) => {
  try {
    // Envia uma requisição POST para a API de autenticação local
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: username, // Identificador (nome de usuário ou email)
      password: password,   // Senha do usuário
    });

    // Define um cookie com o token JWT recebido na resposta
    setCookie(null, 'jwt', response.data.jwt, {
      maxAge: 30 * 24 * 60 * 60, // Tempo de expiração do cookie (30 dias)
      path: '/',                 // Caminho onde o cookie está disponível
    });

    // Retorna os dados do usuário autenticado
    return response.data.user;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console
    console.error('Erro de login:', error);
    // Lança o erro para ser tratado pela função chamadora
    throw error;
  }
};

// Função para deslogar o usuário
export const logoutUser = () => {
  // Remove o cookie do token JWT
  destroyCookie(null, 'jwt', {
    path: '/', // Caminho onde o cookie estava disponível
  });
  
  // Opcionalmente, redireciona o usuário para a página inicial
  window.location.href = '/';
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  // Obtém todos os cookies
  const cookies = parseCookies();
  
  // Retorna true se o cookie do JWT estiver presente, indicando que o usuário está autenticado
  return !!cookies.jwt;
};
