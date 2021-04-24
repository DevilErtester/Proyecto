module.exports = (sequelize, Sequelize) => {
  const Files = sequelize.define("Files", {
    fileName: {
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