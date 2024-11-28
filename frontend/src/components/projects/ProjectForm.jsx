import React, { useState } from 'react';
import api from '../../services/api';

const ProjectForm = ({ onClose, onSave, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        technologies: initialData?.technologies || '',
        repositoryUrl: initialData?.repositoryUrl || '',
        fechaInicio: initialData?.fechaInicio || '',
        fechaEstimacion: initialData?.fechaEstimacion || '',
        estado: initialData?.estado || 'En Progreso', // Valor por defecto
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }
        if (!formData.fechaInicio) {
            newErrors.fechaInicio = 'La fecha de inicio es requerida';
        }
        if (!formData.fechaEstimacion) {
            newErrors.fechaEstimacion = 'La fecha estimada es requerida';
        }
        // Validar que fecha estimación sea posterior a fecha inicio
        if (formData.fechaInicio && formData.fechaEstimacion && 
            new Date(formData.fechaEstimacion) <= new Date(formData.fechaInicio)) {
            newErrors.fechaEstimacion = 'La fecha estimada debe ser posterior a la fecha de inicio';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            if (initialData) {
                await api.patch(`/projects/${initialData.uuid}`, formData);
            } else {
                await api.post('/projects', formData);
            }
            onSave();
            onClose();
        } catch (error) {
            setErrors({
                submit: error.response?.data?.msg || 'Error al guardar el proyecto'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        {initialData ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                                ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                                ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/*campos de fecha */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Fecha de Inicio
                            </label>
                            <input
                                type="date"
                                name="fechaInicio"
                                value={formData.fechaInicio}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                                    ${errors.fechaInicio ? 'border-red-500' : ''}`}
                            />
                            {errors.fechaInicio && (
                                <p className="mt-1 text-sm text-red-600">{errors.fechaInicio}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Fecha Estimada de Finalización
                            </label>
                            <input
                                type="date"
                                name="fechaEstimacion"
                                value={formData.fechaEstimacion}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                                    ${errors.fechaEstimacion ? 'border-red-500' : ''}`}
                            />
                            {errors.fechaEstimacion && (
                                <p className="mt-1 text-sm text-red-600">{errors.fechaEstimacion}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tecnologías
                        </label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            placeholder="ej: React, Node.js, MySQL"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            URL del Repositorio
                        </label>
                        <input
                            type="text"
                            name="repositoryUrl"
                            value={formData.repositoryUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/usuario/repositorio"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estado del Proyecto
                        </label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="En Progreso">En Progreso</option>
                            <option value="pausado">Pausado</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    {errors.submit && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{errors.submit}</p>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;