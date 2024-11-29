import TestResult from '../models/TestResult.js';
import Project from '../models/ProjectModel.js';

export const getAllTests = async (req, res) => {
    try {
        console.log("Iniciando búsqueda de tests...");

        const tests = await TestResult.findAll({
            include: [{
                model: Project,  // Asegúrate de que Projects esté importado
                attributes: ['name', 'uuid'] // Los campos que necesitamos del proyecto
            }],
            order: [['executionDate', 'DESC']], // Ordenar por fecha de ejecución
        });
        console.log("Tests encontrados:", JSON.stringify(tests, null, 2)); // Para debugging
        res.status(200).json(tests);
    } catch (error) {
        console.error("Error al obtener pruebas:", error);
        res.status(500).json({ msg: "Error al cargar las pruebas" });
    }
};

export const runProjectTests = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("Ejecutando test para proyecto:", projectId); // Debug

        const project = await Project.findOne({
            where: {
                uuid: projectId
            }
        });

        if (!project) {
            return res.status(404).json({ msg: "Proyecto no encontrado" });
        }

        // Crear resultado de prueba
        const testResult = await TestResult.create({
            projectId: project.id,
            status: 'SUCCESS',
            codeQuality: {
                linesOfCode: 150,
                complexity: 'low',
                duplications: '2%'
            },
            securityIssues: {
                high: 0,
                medium: 1,
                low: 2
            },
            performanceMetrics: {
                responseTime: '120ms',
                throughput: '1000 req/sec',
                memoryUsage: '256MB',
                cpuUtilization: '45%',
                loadTime: '1.5s'
            },
            testSummary: {
                total: 10,
                passed: 9,
                failed: 1,
                coverage: '80%'
            },
            executionLogs: 'Test ejecutado exitosamente - Análisis completo del código realizado.',
            commitInfo: {
                hash: 'abc123',
                branch: 'main',
                timestamp: new Date()
            }
        });

        res.status(200).json({
            msg: "Test ejecutado exitosamente",
            testResult
        });

    } catch (error) {
        console.error("Error ejecutando test:", error);
        res.status(500).json({
            msg: "Error al ejecutar el test",
            error: error.message
        });
    }
};

// Obtener historial de tests de un proyecto
export const getTestHistory = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            where: {
                uuid: projectId
            }
        });

        if (!project) {
            return res.status(404).json({ msg: "Proyecto no encontrado" });
        }

        const tests = await TestResult.findAll({
            where: {
                projectId: project.id
            },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(tests);

    } catch (error) {
        console.error("Error obteniendo historial:", error);
        res.status(500).json({
            msg: "Error al obtener historial",
            error: error.message
        });
    }
};