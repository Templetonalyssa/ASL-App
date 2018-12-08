module.exports = function(sequelize, DataTypes) {
  var Asl = sequelize.define("Asl", {
    search: DataTypes.STRING,
    url: DataTypes.TEXT
  });
  return Asl;
};
