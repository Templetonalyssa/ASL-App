module.exports = function(sequelize, DataTypes) {
  var Asl = sequelize.define("Asl", {
    search: DataTypes.STRING,
    count: DataTypes.INTEGER
  });
  return Asl;
};
