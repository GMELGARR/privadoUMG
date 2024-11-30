import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeProjects: 0,
        totalTests: 0,
        successRate: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Cargando datos...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Bienvenido, {user?.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-blue-700">Proyectos</h2>
                    <p className="text-3xl font-bold">{stats.activeProjects}</p>
                    <p className="text-sm text-blue-600">Proyectos activos</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-green-700">Tests</h2>
                    <p className="text-3xl font-bold">{stats.totalTests}</p>
                    <p className="text-sm text-green-600">Tests ejecutados</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-purple-700">Estado</h2>
                    <p className="text-3xl font-bold">{stats.successRate.toFixed(0)}%</p>
                    <p className="text-sm text-purple-600">Tests exitosos</p>
                </div>
            </div>

            <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
                {stats.recentActivity.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentActivity.map(activity => (
                            <div key={activity.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium">{activity.Project?.name || 'Proyecto sin nombre'}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(activity.executionDate).toLocaleString()}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    activity.status === 'SUCCESS' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay actividad reciente</p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;