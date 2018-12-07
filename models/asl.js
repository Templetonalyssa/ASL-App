module.exports = function(sequelize, DataTypes) {
  var Asl = sequelize.define("Asl", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Asl;
};
