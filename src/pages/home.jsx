// Importando Componentes / Bibliotecas React
import { useState, useRef } from 'react';
import { Helix } from 'ldrs/react'; 
import 'ldrs/react/Helix.css';
import {toast } from 'react-toastify';

// Importando Componentes / Páginas

const Home = () => {
    const [matricula, setMatricula] = useState(''); // Passo 1: Armazena a matrícula
    const [showBiometriaButton, setShowBiometriaButton] = useState(false); // Passo 2: Controla se mostra botão biometria
    const [showCamera, setShowCamera] = useState(false); // Passo 3: Controla se mostra câmera
    const [isLoading, setIsLoading] = useState(false); // Passo 4: Controla loading
    
    const videoRef = useRef(null); // Referência para o elemento video
    const canvasRef = useRef(null); // Referência para capturar a foto

    // Validação: só números, 4-6 dígitos
    const handleMatriculaChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Só números
        if (value.length <= 6) setMatricula(value);
    };

    // Passo 1: Função para enviar matrícula
    const handleEnviarMatricula = () => {
        if (matricula.length < 4) {
            toast.error('Matrícula deve ter pelo menos 4 dígitos.');
            return;
        }
        setShowBiometriaButton(true);
    };

    // Passo 2: Função para iniciar biometria
    const handleIniciarBiometria = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true 
            });
            videoRef.current.srcObject = stream;
            setShowCamera(true);
            setShowBiometriaButton(false);
        } catch (error) {
            toast.error('Erro ao acessar a câmera. Permita o acesso nas configurações do navegador e tente novamente.');
            console.error(error);
        }
    };

    // Passo 3: Função para tirar foto
    const handleTirarFoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const stream = video.srcObject;
        stream.getTracks().forEach(track => track.stop());
        setShowCamera(false);

        setIsLoading(true);
        setTimeout(() => {
            const sucesso = Math.random() > 0.3;
            setIsLoading(false);
            if (sucesso) {
                toast.success('Sucesso! Registro realizado.'); // Substitua setMessage
            } else {
                toast.error('Falha! Tente novamente.'); // Substitua setMessage
            }
            setMatricula('');
            setShowBiometriaButton(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Registro de Ponto - AZ Controle</h1>

            {/* Passo 1: Input e botão enviar */}
            {!showBiometriaButton && !showCamera && !isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="matricula">Matrícula do Funcionário:</label>
                    <input
                        id="matricula"
                        type="text"
                        value={matricula}
                        onChange={handleMatriculaChange}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 123456"
                        maxLength="6"
                    />
                    <button
                        onClick={handleEnviarMatricula}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Enviar
                    </button>
                </div>
            )}

            {/* Passo 2: Botão biometria */}
            {showBiometriaButton && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md text-center">
                    <p className="mb-4 text-gray-600">Matrícula confirmada. Clique para iniciar biometria facial.</p>
                    <button
                        onClick={handleIniciarBiometria}
                        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                    >
                        Iniciar Biometria Facial
                    </button>
                </div>
            )}

            {/* Passo 3: Câmera */}
            {showCamera && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md text-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline // Para iOS
                        className="w-full mb-4 rounded-lg border"
                    ></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <button
                        onClick={handleTirarFoto}
                        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                    >
                        Tirar Foto
                    </button>
                </div>
            )}

            {/* Passo 4: Loading */}
            {isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md text-center">
                    <p className="mb-4 text-gray-600">Processando biometria...</p>
                    <Helix size="50" speed="2.0" color="#FFFC00" />
                </div>
            )}

        </div>
    );
}

export default Home;