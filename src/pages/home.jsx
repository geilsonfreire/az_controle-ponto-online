// Importando Componentes / Bibliotecas React
import { useState, useRef,useEffect } from 'react';
import { Helix } from 'ldrs/react'; 
import 'ldrs/react/Helix.css';
import { toast } from 'react-toastify';

// Importando Componentes / Páginas
import { buscarRegistrosPonto, enviarRegistroPonto, atualizarRegistroPonto } from '../services/apiService';
import { buscarFuncionarios } from '../services/funcionarioService';



const Home = () => {
    // Estados
    const [matricula, setMatricula] = useState(''); 
    const [showBiometriaButton, setShowBiometriaButton] = useState(false); 
    const [showCamera, setShowCamera] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [nomeFuncionario, setNomeFuncionario] = useState('');


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
    const handleEnviarMatricula = async () => {
        if (matricula.length < 4) {
            toast.error('Matrícula deve ter pelo menos 4 dígitos.');
            return;
        }

        try {
            setIsLoading(true);

            const funcionarios = await buscarFuncionarios();

            const funcionarioEncontrado = funcionarios.find(
                (f) => String(f.matricula) === String(matricula)
            );

            if (!funcionarioEncontrado) {
                toast.error('Matrícula não encontrada. Procure o RH.');
                setNomeFuncionario('');
                return;
            }

            // ✅ Matrícula válida
            setNomeFuncionario(funcionarioEncontrado.nome);
            toast.success(`Seja bem-vindo, ${funcionarioEncontrado.nome}!`);
            setShowBiometriaButton(true);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao validar matrícula.');
        } finally {
            setIsLoading(false);
        }
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

    // Função para comparar datas (ignora horário)
    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };


    // 📸 Capturar foto e enviar
    const handleTirarFoto = async () => {
        try {
            setIsLoading(true);

            // 📸 Captura da imagem
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);

            const agora = getNowISO();
            const imagemBase64 = canvas.toDataURL('image/jpeg');

            // 🛑 Finaliza câmera
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setShowCamera(false);

            // 🔍 Buscar registros de ponto
            const registros = await buscarRegistrosPonto();

            // 🔎 Registro do dia do funcionário
            const registroHoje = registros.find(r =>
                String(r.Matricula) === String(matricula) &&
                r.data_hora_inicio &&
                isSameDay(r.data_hora_inicio, agora)
            );

            // 🧠 DECISÃO
            if (!registroHoje) {
                // ✅ PRIMEIRO REGISTRO (ENTRADA)
                await enviarRegistroPonto({
                    Matricula: matricula,
                    data_hora_inicio: agora,
                    data_hora_fim: '',
                    foto_registro: imagemBase64,
                });

                toast.success('Entrada registrada com sucesso!');

            } else if (!registroHoje.data_hora_fim) {
                // ✅ SEGUNDO REGISTRO (SAÍDA)
                await atualizarRegistroPonto(
                    registroHoje._lineNumber,
                    {
                        data_hora_fim: agora,
                        foto_registro: imagemBase64,
                    }
                );
                
                toast.success('Saída registrada com sucesso!');

            } else {
                // ❌ JÁ REGISTROU ENTRADA E SAÍDA
                toast.error('Ponto do dia já foi registrado.');
            }

            // 🔄 Reset
            setMatricula('');
            setNomeFuncionario('');
            setShowBiometriaButton(false);

        } catch (error) {
            console.error(error);
            toast.error('Erro ao registrar ponto.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                AZ Comunicação Visual Ltda
            </h1>

            {!showBiometriaButton && !showCamera && !isLoading && (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                    <label className="block font-medium mb-2">
                        Registro de Ponto
                    </label>
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
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
                    <p className="text-lg">Seja bem-vindo,</p>
                    <p className="text-xl font-bold text-green-600 mb-4">
                        {nomeFuncionario}
                    </p>
                    <button
                        onClick={handleIniciarBiometria}
                        className="bg-green-600 text-white py-3 px-6 rounded-lg"
                    >
                        Iniciar Biometria Facial
                    </button>
                </div>
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
                    <p className="mb-4">Processando...</p>
                    <Helix size="50" speed="2.0" color="#FFFC00" />
                </div>
            )}
        </div>
    );
};

export default Home;