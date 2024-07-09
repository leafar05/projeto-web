import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/app/produtos/style2/produtos.module.css';
import Header from '@/app/header';
import Footer from '@/app/footer';

const SobreNosPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className={styles.container}>
                <h1 className="text-center my-4">Sobre Nós</h1>
                <div className="text-center mx-auto" style={{ maxWidth: '600px' }}>
                    <h2 className="mb-3">Nossa História</h2>
                    <p>
                        Nosso food truck nasceu do sonho de dois amigos apaixonados por culinária e aventuras.
                        Em 2020, decidimos levar nossa paixão para as ruas, oferecendo pratos saborosos e de alta
                        qualidade a preços acessíveis. Desde então, temos conquistado o coração de nossos clientes
                        com nossa comida deliciosa e nosso atendimento amigável.
                    </p>
                    <h2 className="mt-4 mb-3">Nossa Missão</h2>
                    <p>
                        Nossa missão é proporcionar uma experiência gastronômica única, combinando ingredientes
                        frescos e técnicas culinárias inovadoras. Queremos ser mais do que apenas um food truck;
                        queremos criar memórias inesquecíveis para nossos clientes. Estamos comprometidos em
                        oferecer excelência em cada prato e um sorriso em cada atendimento.
                    </p>
                </div>
                <a href="/" type='button' className={`btn btn-success`}>Voltar</a>
            </div>
            <Footer />
        </div>
    );
};

export default SobreNosPage;
