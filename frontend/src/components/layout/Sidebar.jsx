import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        { path: '/dashboard', name: 'Dashboard', icon: '📊' },
        { path: '/projects', name: 'Proyectos', icon: '📁' },
        { path: '/tests', name: 'Pruebas', icon: '🧪' }
    ];

    if (user?.role === 'admin') {
        menuItems.push({ path: '/users', name: 'Usuarios', icon: '👥' });
    }

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen px-4 py-6">
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Menú Principal</h2>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                    isActive(item.path)
                                        ? 'bg-indigo-600 text-white'
                                        : 'hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;