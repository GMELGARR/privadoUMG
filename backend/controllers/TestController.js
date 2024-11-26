// controllers/TestController.js
import TestAutomationService from '../services/TestAutomationService.js';

export const runProjectTests = async (req, res) => {
    try {
        const { projectId } = req.params;
        const result = await TestAutomationService.runTestsForProject(projectId);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            msg: "Error ejecutando tests",
            error: error.message
        });
    }
};

export const getTestHistory = async (req, res) => {
    try {
        const { projectId } = req.params;
        const history = await TestAutomationService.getTestHistory(projectId);
        res.json(history);
    } catch (error) {
        res.status(500).json({
            msg: "Error obteniendo historial",
            error: error.message
        });
    }
};