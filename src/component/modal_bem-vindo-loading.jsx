// Import Bibliotecas React
import React from "react";

// Import Assests
import Fundo from '../assets/img/fundo.webp';
import Logo from '../assets/img/Logo.webp';

import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'


const ModalBemVindoLoading = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center shadow-xl">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm shadow-xl"
                onClick={onClose}
            />

            {/* modal box: 80% largura e 80% altura da viewport */}
            <div
                className="relative z-10 w-4/5 h-[80vh] rounded-xl overflow-hidden shadow-xl"
                role="dialog"
                aria-modal="true"

            >
                {/* fundo com imagem cobrindo todo o modal */}
                <div
                    className="w-full h-full bg-center bg-cover 
                    flex flex-col"
                    style={{ backgroundImage: `url(${Fundo})` }}
                >
                    {/* conteúdo superior (título/texto) */}
                    <div className="text-center px-6 pt-8 bg-black/80 rounded-br-4xl shadow-xl/30">
                        <h2 className="text-white text-3xl sm:text-2xl md:text-3xl font-bold mb-2 m-0.5 drop-shadow-md">Bem-vindo(a)</h2>
                        <img
                            aria-hidden="true"
                            className="mx-auto max-w-full w-[90%] sm:w-[70%] md:w-[60%] mt-3"
                            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FFFFFF&width=500&lines=Faça+seu+registro+de+PONTO+Aqui!."
                            alt="Seja bem-vindo(a) a AZ Controle de Ponto!"
                        />

                    </div>

                    <div className="flex flex-col items-center gap-6 justify-center grow">
                        {/* Logo animada */}
                        <img
                            src={Logo}
                            alt="AZ Controle de Ponto Logo"
                            className="
                            w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56 2xl:w-64 
                            h-auto mb-4 pb-2
                            animate-pulse
                            brightness-110
                            logo-enter logo-beat"
                        />
                        {/* Loader Infinity */}
                        
                        <Infinity
                            size="80"
                            stroke="4"
                            strokeLength="0.15"
                            bgOpacity="0.1"
                            speed="1.3"
                            color="#FFFC00"
                        />
                    </div>

                    {/* rodapé com botão fechar sobre o fundo */}
                    <div className="px-6 py-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-600 transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBemVindoLoading;