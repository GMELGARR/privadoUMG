// routes/TestRoute.js
import express from "express";
import {
    runProjectTests,
    getTestHistory
} from "../controllers/TestController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Rutas para tests
router.post('/projects/:projectId/tests', verifyUser, runProjectTests);
router.get('/projects/:projectId/tests', verifyUser, getTestHistory);

export default router;