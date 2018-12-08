module.exports = function(sequelize, DataTypes) {
    var Rating = sequelize.define("rating", {
      score: DataTypes.INTEGER,
      url: DataTypes.TEXT
    });
    return Rating;
  };
  