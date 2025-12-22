// Importando Componentes / Bibliotecas React
import {useState}from 'react';

// Importando Componentes / Páginas
import ModalBemVindoLoading from '../component/modal_bem-vindo-loading';


const Home = () => {
    const [showModal, setShowModal] = useState(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="Home">
            <h1>Hollo wold!</h1>
            {showModal && <ModalBemVindoLoading onClose={closeModal} />}
        </div>
    );
}

export default Home;