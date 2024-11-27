import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Bienvenido, {user?.name}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card de Proyectos */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-blue-700">Proyectos</h3>
                        <p className="text-4xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-blue-500">Proyectos activos</p>
                    </div>

                    {/* Card de Tests */}
                    <div className="bg-green-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-green-700">Tests</h3>
                        <p className="text-4xl font-bold text-green-600">0</p>
                        <p className="text-sm text-green-500">Tests ejecutados</p>
                    </div>

                    {/* Card de Estado */}
                    <div className="bg-purple-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-purple-700">Estado</h3>
                        <p className="text-4xl font-bold text-purple-600">100%</p>
                        <p className="text-sm text-purple-500">Tests exitosos</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-500">No hay actividad reciente</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;