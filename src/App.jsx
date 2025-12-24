// Importando Componentes / Bibliotecas React
import { HashRouter as Router } from 'react-router-dom';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Importando Componentes / Páginas
import AppRoutes from './routes/routes';

const AppContent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redireciona para a página de loading ao iniciar o app
        navigate('/loading');
    }, [navigate]);

    return <AppRoutes />;
}

const App = () => {
    
    return (
        <Router>
            <AppContent />
            <ToastContainer />
        </Router>
    );
}

export default App;