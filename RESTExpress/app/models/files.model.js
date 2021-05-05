module.exports = (sequelize, Sequelize) => {
  const Files = sequelize.define("Files", {
    name: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    fileId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    OwnerId: {
      type: Sequelize.STRING,
    }
  });
  return Files;
};