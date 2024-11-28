import React from 'react';

const TestDetail = ({ test, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        Detalles de la Prueba
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Información general */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Información General</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Proyecto:</span> {test.project?.name}</p>
                                <p><span className="font-medium">Estado:</span> 
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold 
                                        ${test.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {test.status}
                                    </span>
                                </p>
                                <p><span className="font-medium">Fecha:</span> {new Date(test.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Resumen de Pruebas</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Total:</span> {test.testSummary.total}</p>
                                <p><span className="font-medium">Exitosas:</span> {test.testSummary.passed}</p>
                                <p><span className="font-medium">Fallidas:</span> {test.testSummary.failed}</p>
                                <p><span className="font-medium">Cobertura:</span> {test.testSummary.coverage}</p>
                            </div>
                        </div>
                    </div>

                    {/* Calidad del código */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Calidad del Código</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600">Líneas de Código</p>
                                <p className="text-2xl font-bold text-blue-700">{test.codeQuality.linesOfCode}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600">Complejidad</p>
                                <p className="text-2xl font-bold text-green-700">{test.codeQuality.complexity}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-purple-600">Duplicación</p>
                                <p className="text-2xl font-bold text-purple-700">{test.codeQuality.duplications}</p>
                            </div>
                        </div>
                    </div>

                    {/* Problemas de seguridad */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Problemas de Seguridad</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-600">Alto</p>
                                <p className="text-2xl font-bold text-red-700">{test.securityIssues.high}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600">Medio</p>
                                <p className="text-2xl font-bold text-yellow-700">{test.securityIssues.medium}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <p className="text-sm text-orange-600">Bajo</p>
                                <p className="text-2xl font-bold text-orange-700">{test.securityIssues.low}</p>
                            </div>
                        </div>
                    </div>

                    {/* Logs de ejecución */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Logs de Ejecución</h3>
                        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                            {test.executionLogs}
                        </pre>
                    </div>

                    {/* Información del commit */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Información del Commit</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><span className="font-medium">Hash:</span> {test.commitInfo.hash}</p>
                            <p><span className="font-medium">Rama:</span> {test.commitInfo.branch}</p>
                            <p><span className="font-medium">Fecha:</span> {new Date(test.commitInfo.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetail;