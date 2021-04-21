module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      }
    },
    {
      indexes: [
          {
              unique: true,
              fields: ['username']
          }
      ]
  });
  
    return Users;
  };