// Import Bibliotecas React
import { useEffect, useState } from 'react';

// Import LDRS
import { Helix, Infinity } from 'ldrs/react';
import 'ldrs/react/Helix.css';

// Import Assests
import Fundo from '../assets/img/fundo.webp';

// Iimport Component
import ModalBemVindoLoading from '../component/modal_bem-vindo-loading';

const Loading = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // mostra o modal após 3 segundos
        const t = setTimeout(() => {
            console.log('ativando modal');
            setShowModal(true);
        }, 3000);
        return () => clearTimeout(t);
    }, []);

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
                <ModalBemVindoLoading onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default Loading;