import styles from './style/home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import Footer from './footer';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className={`container ${styles.container}`}>
        <p className={styles.text}>Aqui você encontra os melhores food trucks da cidade!</p>
        <a href="/produtos" className={`btn btn-primary bg-success`} type="button">Produtos</a><br />
        <p>Aberto de Segunda a Sexta, 11h às 21h30</p>
        <p>Aberto de Sábado e Domingo, 10h às 23h</p>
      </div>
      <Footer />
    </div>
  );
}
