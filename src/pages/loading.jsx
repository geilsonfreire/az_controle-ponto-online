// Import Bibliotecas React
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

// Import LDRS
import { Helix} from 'ldrs/react';
import 'ldrs/react/Helix.css';

// Import Assests
import Fundo from '../assets/img/fundo.webp';

// Iimport Component
import ModalBemVindoLoading from '../component/modal_bem-vindo-loading';

const Loading = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => {
            console.log('ativando modal');
            setShowModal(true);
        }, 2000); // 2000ms
        return () => clearTimeout(t);
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/home'); // Navega para a página home após fechar o modal
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url(${Fundo})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="flex flex-col items-center gap-6 justify-center">
                {/* Loader */}
                <Helix
                    size="80"
                    speed="2.0"
                    color="#FFFC00"
                />
            </div>
            {/* modal sobreposto (aparece depois do timeout) */}
            {showModal && (
                <ModalBemVindoLoading onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Loading;