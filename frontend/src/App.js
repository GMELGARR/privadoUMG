import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ProjectList from './components/projects/ProjectList';
import PrivateRoute from './components/Auth/PrivateRoute';
import { useAuth } from './context/AuthContext';

// Componente para manejar la redirección desde el login
const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rutas públicas */}
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } 
                    />

                    {/* Rutas privadas */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    {/* Ruta de proyectos */}
                    <Route
                        path="/projects"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <ProjectList />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    {/* Redireccionamiento por defecto */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Ruta 404 */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;