// Importando Componentes / Bibliotecas React
import { HashRouter as Router } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Importando Componentes / Páginas
import AppRoutes from './routes/routes';

const App = () => {
    
    return (
        <Router>
            <AppRoutes />
            <ToastContainer />
        </Router>
    );
}

export default App;