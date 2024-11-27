import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await authService.logout();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-800">
                            Sistema de Testing
                        </span>
                    </div>

                    <div className="flex items-center">
                        <span className="px-4 text-gray-600">
                            {user?.name}
                        </span>
                        <div className="ml-4 flex items-center">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-red-600 hover:text-red-900 focus:outline-none"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;