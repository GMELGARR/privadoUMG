import React, { useState, useEffect } from "react";
import { FileText, Gauge, Code, Shield } from "lucide-react";
import api from "../../services/api";

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
      console.log(JSON.stringify(response.data[0], null, 2));
      setTests(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar tests:", err);
      setError(
        "Error al cargar las pruebas: " +
          (err.response?.data?.msg || err.message)
      );
      setLoading(false);
    }
  };

  const parseJsonField = (jsonString) => {
    try {
      return typeof jsonString === "string"
        ? JSON.parse(jsonString)
        : jsonString;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return null;
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
        {tests.map((test) => {
          const codeQuality = parseJsonField(test.codeQuality);
          const securityIssues = parseJsonField(test.securityIssues);
          const performanceMetrics = parseJsonField(test.performanceMetrics);
          const testSummary = parseJsonField(test.testSummary);
          //  const commitInfo = parseJsonField(test.commitInfo);

          return (
            <div key={test.uuid} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {test.project?.name ||
                      test.Project?.name ||
                      "Sin nombre de proyecto"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(test.executionDate).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    test.status === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {test.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-1">
                    <Code className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">
                      Calidad de Código
                    </span>
                  </div>
                  <p className="text-sm">
                    LOC: {codeQuality?.linesOfCode || "N/A"}
                  </p>
                  <p className="text-sm">
                    Complejidad: {codeQuality?.complexity || "N/A"}
                  </p>
                  <p className="text-sm">
                    Duplicación: {codeQuality?.duplications || "N/A"}
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center text-green-600 mb-1">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Seguridad</span>
                  </div>
                  <p className="text-sm">
                    Altas: {securityIssues?.high || "0"}
                  </p>
                  <p className="text-sm">
                    Medias: {securityIssues?.medium || "0"}
                  </p>
                  <p className="text-sm">Bajas: {securityIssues?.low || "0"}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg mb-4">
                <div className="flex items-center text-purple-600 mb-2">
                  <FileText className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">
                    Resumen de Pruebas
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Total: {testSummary?.total || "0"}</p>
                  <p className="text-green-600">
                    Exitosas: {testSummary?.passed || "0"}
                  </p>
                  <p className="text-red-600">
                    Fallidas: {testSummary?.failed || "0"}
                  </p>
                  <p>Cobertura: {testSummary?.coverage || "N/A"}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg mb-4">
                <div className="flex items-center text-orange-600 mb-2">
                  <Gauge className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Rendimiento</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Tiempo: {performanceMetrics?.responseTime || "N/A"}</p>
                  <p>Memoria: {performanceMetrics?.memoryUsage || "N/A"}</p>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(test)}
                className="w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
              >
                Ver Detalles
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal de detalles */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
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

            <div className="space-y-4">
              {/* Información del Proyecto */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Información del Proyecto</h3>
                <p className="text-sm">
                  Nombre:{" "}
                  {selectedTest.Project?.name ||
                    `Proyecto ${selectedTest.projectId}`}
                </p>
                <p className="text-sm">
                  Fecha de Ejecución:{" "}
                  {new Date(selectedTest.executionDate).toLocaleString()}
                </p>
                <p className="text-sm">
                  Estado:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedTest.status === "SUCCESS"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedTest.status}
                  </span>
                </p>
              </div>

              {/* Detalles del commit */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Información del Commit</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hash:</p>
                    <p className="text-sm font-mono">
                      {typeof selectedTest.commitInfo === "string"
                        ? JSON.parse(selectedTest.commitInfo)?.hash || "N/A"
                        : selectedTest.commitInfo?.hash || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rama:</p>
                    <p className="text-sm">
                      {typeof selectedTest.commitInfo === "string"
                        ? JSON.parse(selectedTest.commitInfo)?.branch || "N/A"
                        : selectedTest.commitInfo?.branch || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Autor:</p>
                    <p className="text-sm">
                      {typeof selectedTest.commitInfo === "string"
                        ? JSON.parse(selectedTest.commitInfo)?.author || "N/A"
                        : selectedTest.commitInfo?.author || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fecha:</p>
                    <p className="text-sm">
                      {(() => {
                        const timestamp =
                          typeof selectedTest.commitInfo === "string"
                            ? JSON.parse(selectedTest.commitInfo)?.timestamp
                            : selectedTest.commitInfo?.timestamp;
                        return timestamp
                          ? new Date(timestamp).toLocaleString()
                          : "N/A";
                      })()}
                    </p>
                  </div>
                </div>

                {/* Debug Info - Solo durante desarrollo */}
                <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                  <p>Datos raw del commit:</p>
                  <pre>{JSON.stringify(selectedTest.commitInfo, null, 2)}</pre>
                </div>
              </div>

              {/* Logs de ejecución */}
              <div>
                <h3 className="font-medium mb-2">Logs de Ejecución</h3>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                  {selectedTest.executionLogs || "No hay logs disponibles"}
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
