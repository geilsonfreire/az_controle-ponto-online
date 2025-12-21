// Import Bibliotecas React
import React from "react";

// Import Assests
import Fundo from '../assets/img/fundo.webp';
import Person from '../assets/img/person.webp';

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
                            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FFFFFF&width=500&lines=Obrigado+por+visitar+a+Rifa+AC+Online."
                            alt="Seja bem-vindo(a) a AZ Controle de Ponto!"
                        />
                        
                    </div>
                    {/* Img do personagem do modal */}
                    <div>
                        <img
                            className="mx-auto max-w-full h-auto w-[60%] sm:w-[50%] md:w-[40%] mt-2 drop-shadow-lg"
                            src={Person}                            alt="Personagem de boas-vindas"
                            
                        />
                    </div>

                    {/* rodapé com botão fechar sobre o fundo */}
                    <div className="px-6 py-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition"
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