'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Añadir el nuevo campo 'repositoryUrl' a la tabla 'projects'
    await queryInterface.addColumn('project', 'repositoryUrl', {
      type: Sequelize.STRING,
      allowNull: true, // El campo puede ser nulo
    });
  },

  async down (queryInterface, Sequelize) {
    // Eliminar el campo 'repositoryUrl' si revertimos la migración
    await queryInterface.removeColumn('project', 'repositoryUrl');
  }
};

