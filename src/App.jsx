// Importando Componentes / Bibliotecas React
import { HashRouter as Router } from 'react-router-dom';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

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
        </Router>
    );
}

export default App;