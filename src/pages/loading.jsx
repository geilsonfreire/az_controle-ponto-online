// Import Bibliotecas React
import { useEffect, useState } from 'react';

// Import LDRS
import { Helix } from 'ldrs/react';
import 'ldrs/react/Helix.css';

// Import Assests
import Logo from '../assets/img/Logo.svg';

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
                background:
                    'linear-gradient(162deg, rgba(181, 22, 160, 1) 0%, rgba(154, 87, 199, 1) 50%, rgba(237, 83, 222, 1) 100%)',
            }}
        >
            <div className="flex flex-col items-center gap-6">

                {/* Logo animada */}
                <img
                    src={Logo}
                    alt="AZ Controle de Ponto Logo"
                    className="
                        w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 
                        h-auto mb-4 pb-2
                        animate-pulse
                        brightness-110
                        logo-enter logo-beat
                    "
                />

                {/* Loader */}
                <Helix
                    size="55"
                    speed="2.0"
                    color="#FFFFFF"
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