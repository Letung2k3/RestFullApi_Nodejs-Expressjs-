'use strict';
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('Doctors_Clinics_Specialties', {
               // patientId: DataTypes.INTEGER,
               // clinicId: DataTypes.INTEGER,
               // specialtyId: DataTypes.INTEGER
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
               },
               patientId: {
                    type: Sequelize.INTEGER
               },
               clinicId: {
                    type: Sequelize.INTEGER
               },
               specialtyId: {
                    type: Sequelize.INTEGER
               },
               createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
               },
               updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
               }
          });
     },
     down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('Doctors_Clinics_Specialties');
     }
};