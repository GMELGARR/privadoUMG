import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";

export const getProjects = async (req, res) => {
    try {
        // Obtiene todos los proyectos, independientemente del rol del usuario
        const response = await Project.findAll({
            include: [{
                model: User,
                attributes: ['uuid', 'name', 'username'] // Limitar atributos si es necesario
            }]
        });

        // Devuelve los proyectos encontrados
        res.status(200).json(response);
    } catch (error) {
        // Manejo de errores detallado
        console.error("Error al obtener proyectos:", error.message); // Log para el servidor

        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ msg: "Error de base de datos. Por favor, intenta más tarde." });
        }

        // Para cualquier otro tipo de error, devuelve un mensaje genérico
        res.status(500).json({ msg: "Error en el servidor. Por favor, intenta más tarde." });
    }
};

export const getProjectById = (req, res)  => {

}

export const createProject = async (req, res) => {
    const { name, description, technologies, fechaInicio, fechaEstimacion, estado, repositoryUrl } = req.body;

    // Validación estricta de campos requeridos
    if (!name || !description || !technologies || !fechaInicio || !fechaEstimacion || !estado) {
        return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }

    // Validación adicional: Si se proporciona repositoryUrl, verificar si es una URL válida
    if (repositoryUrl && !/^https?:\/\/[^\s]+$/.test(repositoryUrl)) {
        return res.status(400).json({ msg: "La URL del repositorio no es válida." });
    }

    try {
        const newProject = await Project.create({
            name,
            description,
            technologies,
            userId: req.userId, // Asegúrate de que req.userId esté definido
            fechaInicio,
            fechaEstimacion,
            repositoryUrl, // Incluir la URL del repositorio si se proporciona
            estado
        });

        res.status(201).json({
            msg: "Proyecto creado exitosamente.",
            project: newProject // Devolver el proyecto creado
        });
    } catch (error) {
        console.error("Error al crear el proyecto:", error.message); // Log del error
        res.status(500).json({ msg: "Error en el servidor. Por favor, intenta más tarde." });
    }
};


export const updateProject = (req, res)  => {

}

export const deleteProject = (req, res)  => {

}