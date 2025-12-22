// Importando Componentes / Bibliotecas React
import { BrowserRouter as Router } from 'react-router-dom';

//Importando Componentes / Páginas
import AppRoutes from './routes/routes';

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;