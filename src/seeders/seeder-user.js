'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        // fullName: DataTypes.STRING,
        // email: DataTypes.STRING,
        // password: DataTypes.STRING,
        // image: DataTypes.STRING,
        // address: DataTypes.STRING,
        // gender: DataTypes.BOOLEAN,
        // phonenumber: DataTypes.STRING,
        // roleId: DataTypes.STRING,
        // positionId: DataTypes.STRING,
        fullName: 'Johne Tung',
        email: 'letung@example.com',
        password: '123456', // plain text password
        Image: 'h1.jpg',
        address: 'USA',
        gender: 1,
        phonenumber: '0914591063',
        roleId: "R1",
        positionId: 'Thạc sỹ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
