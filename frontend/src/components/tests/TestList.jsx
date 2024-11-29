import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FileText, Gauge, Code, Shield } from "lucide-react";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const response = await api.get("/tests");
      setTests(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las pruebas");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      case "ERROR":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (test) => {
    setSelectedTest(test);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando pruebas...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pruebas</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <div
            key={test.uuid}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {/* Encabezado */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                {test.Project ? test.Project.name : `Proyecto ${test.projectId}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(test.executionDate).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  test.status
                )}`}
              >
                {test.status}
              </span>
            </div>

            {/* Métricas principales */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center text-blue-600 mb-1">
                  <Code className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Calidad de Código</span>
                </div>
                <p className="text-sm">
                  LOC: {test.codeQuality?.linesOfCode || "N/A"}
                </p>
                <p className="text-sm">
                  Complejidad: {test.codeQuality?.complexity || "N/A"}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center text-green-600 mb-1">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Seguridad</span>
                </div>
                <p className="text-sm">
                  Altas: {test.securityIssues?.high || "0"}
                </p>
                <p className="text-sm">
                  Medias: {test.securityIssues?.medium || "0"}
                </p>
              </div>
            </div>

            {/* Resumen de pruebas */}
            <div className="mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center text-purple-600 mb-2">
                  <FileText className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Resumen de Pruebas</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Total: {test.testSummary?.total || "0"}</p>
                  <p className="text-green-600">
                    Exitosas: {test.testSummary?.passed || "0"}
                  </p>
                  <p className="text-red-600">
                    Fallidas: {test.testSummary?.failed || "0"}
                  </p>
                  <p>Cobertura: {test.testSummary?.coverage || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Métricas de rendimiento */}
            <div className="mb-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center text-orange-600 mb-2">
                  <Gauge className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Rendimiento</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    Tiempo: {test.performanceMetrics?.responseTime || "N/A"}
                  </p>
                  <p>
                    Memoria: {test.performanceMetrics?.memoryUsage || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Botón para ver más detalles */}
            <button
              onClick={() => handleViewDetails(test)}
              className="w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Detalles de la Prueba
              </h2>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {/* Información detallada */}
            <div className="space-y-4">
              {/* Detalles del commit */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Información del Commit</h3>
                <p className="text-sm">Hash: {selectedTest.commitInfo?.hash}</p>
                <p className="text-sm">Rama: {selectedTest.commitInfo?.branch}</p>
                <p className="text-sm">
                  Fecha: {new Date(selectedTest.commitInfo?.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Logs de ejecución */}
              <div>
                <h3 className="font-medium mb-2">Logs de Ejecución</h3>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                  {selectedTest.executionLogs}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestList;