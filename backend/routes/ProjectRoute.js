import express from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/Projects.js";
//import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Ruta para obtener todos los proyectos, solo accesible por administradores
router.get('/projects', getProjects);

// Ruta para obtener un Proyecto por ID, solo accesible por administradores
router.get('/projects/:id', getProjectById);

// Ruta para crear un nuevo proyecto, solo accesible por administradores
router.post('/projects', createProject);

// Ruta para actualizar un proyecto existente, solo accesible por administradores
router.patch('/projects/:id', updateProject);

// Ruta para eliminar un proyecto, solo accesible por administradores
router.delete('/projects/:id', deleteProject);

export default router;
