import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
//import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Ruta para obtener todos los usuarios activos, solo accesible por administradores
router.get('/users', getUsers);

// Ruta para obtener un usuario activo por ID, solo accesible por administradores
router.get('/users/:id', getUserById);

// Ruta para crear un nuevo usuario, solo accesible por administradores
router.post('/users', createUser);

// Ruta para actualizar un usuario existente, solo accesible por administradores
router.patch('/users/:id', updateUser);

// Ruta para desactivar un usuario (en lugar de eliminarlo), solo accesible por administradores
router.delete('/users/:id', deleteUser);

export default router;
