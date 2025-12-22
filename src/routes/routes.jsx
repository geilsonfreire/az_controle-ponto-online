// src/routes/routes.jsx
import { Routes, Route } from 'react-router-dom';

// Importando Componentes / Páginas
import Loading from '../pages/loading';
import Home from '../pages/home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default AppRoutes;