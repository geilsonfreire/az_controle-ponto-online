// Importando Componentes / Bibliotecas React
import { useState, useRef,useEffect } from 'react';
import { Helix } from 'ldrs/react'; 
import 'ldrs/react/Helix.css';
import { toast } from 'react-toastify';

// Importando Componentes / Páginas

const Home = () => {
    // Estados
    const [matricula, setMatricula] = useState(''); 
    const [showBiometriaButton, setShowBiometriaButton] = useState(false); 
    const [showCamera, setShowCamera] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 

    // Refs
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    // Função para obter timestamp atual em ISO
    const getNowISO = () => new Date().toISOString();

    
    // Limpeza da câmera ao sair da página
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

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
                video: {
                    facingMode: 'user', // câmera frontal
                },
                audio: false, 
            });
            
            streamRef.current = stream;
            setShowCamera(true);
            setShowBiometriaButton(false);

        } catch (error) {
            toast.error('Erro ao acessar a câmera. Permita o acesso nas configurações do navegador e tente novamente.');
            console.error(error);
        }
    };

    // Passo 3: Função para tirar foto
    useEffect(() => {
        if (showCamera && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play();
        }
    }, [showCamera]);

    const handleTirarFoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 📌 Data/hora única do registro
        const dataHoraRegistro = getNowISO();

        // Captura da imagem
        const imagemBase64 = canvas.toDataURL('image/jpeg');

        // Finaliza câmera
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      

        setShowCamera(false);
        setIsLoading(true);

        
        // 📦 Payload FINAL para backend
        const payload = {
            matricula,
            dataHora: dataHoraRegistro,
            imagemBase64,
        };

        console.log('📦 Payload para backend:', payload);

        // Simulação de envio
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Registro realizado com sucesso!');
            setMatricula('');
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Registro de Ponto - AZ Controle
            </h1>

            {!showBiometriaButton && !showCamera && !isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                    <input
                        type="text"
                        value={matricula}
                        onChange={handleMatriculaChange}
                        className="w-full p-3 border rounded-lg mb-4"
                        placeholder="Matrícula"
                    />
                    <button
                        onClick={handleEnviarMatricula}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Enviar
                    </button>
                </div>
            )}

            {showBiometriaButton && (
                <button
                    onClick={handleIniciarBiometria}
                    className="bg-green-600 text-white py-3 px-6 rounded-lg"
                >
                    Iniciar Biometria Facial
                </button>
            )}

            {showCamera && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full mb-4 rounded-lg border"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <button
                        onClick={handleTirarFoto}
                        className="bg-red-600 text-white py-3 px-6 rounded-lg"
                    >
                        Tirar Foto
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <p className="mb-4">Processando biometria...</p>
                    <Helix size="50" speed="2.0" color="#FFFC00" />
                </div>
            )}
        </div>
    );
};

export default Home;