import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Si no hay usuario autenticado, redirige al login
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario autenticado, renderiza el contenido
    return children;
};

export default PrivateRoute;