import React, { useState, useEffect } from "react";
import api from "../../services/api";
import ProjectForm from "./ProjectForm";
import { Pencil, Trash2, TestTube } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const getStatusColor = (estado) => {
  switch (estado?.toLowerCase()) {
    case "en progreso":
      return "bg-green-100 text-green-800";
    case "pausado":
      return "bg-yellow-100 text-yellow-800";
    case "completado":
      return "bg-blue-100 text-blue-800";
    case "cancelado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los proyectos");
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm("¿Está seguro de que desea eliminar este proyecto?")) {
      try {
        await api.delete(`/projects/${uuid}`);
        loadProjects();
      } catch (error) {
        setError("Error al eliminar el proyecto");
      }
    }
  };

  const handleCloseForm = () => {
    setSelectedProject(null);
    setShowForm(false);
  };

  const handleSave = () => {
    loadProjects();
    handleCloseForm();
  };
  const handleRunTest = async (projectId, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post(`/tests/run/${projectId}`);

      // Actualizar la lista de proyectos
      const updatedProjects = projects.map((project) => {
        if (project.uuid === projectId) {
          return {
            ...project,
            lastTestDate: new Date().toISOString(),
          };
        }
        return project;
      });
      setProjects(updatedProjects);

      // Mostrar mensaje de éxito
      setSuccessMessage("Test ejecutado exitosamente");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/tests'); // Redirigir a la página de tests
      }, 2000);

    } catch (error) {
      setError(
        "Error al ejecutar el test: " +
          (error.response?.data?.msg || error.message)
      );
      console.error("Error completo:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando proyectos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Proyectos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Nuevo Proyecto
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tecnologías
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Estimada
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Prueba
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.uuid} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {project.name}
                  </div>
                  {project.repositoryUrl && (
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Repositorio
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{project.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{project.technologies}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(project.fechaInicio).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(project.fechaEstimacion).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      project.estado
                    )}`}
                  >
                    {project.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {project.lastTestDate ? (
                      <div>
                        <div className="text-gray-900">
                          {new Date(project.lastTestDate).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(project.lastTestDate).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">Sin pruebas</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-full transition-colors"
                      title="Editar proyecto"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={(e) => handleRunTest(project.uuid, e)}
                      className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded-full transition-colors"
                      title="Ejecutar pruebas"
                    >
                      <TestTube size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.uuid)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded-full transition-colors"
                      title="Eliminar proyecto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProjectForm
          onClose={handleCloseForm}
          onSave={handleSave}
          initialData={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectList;