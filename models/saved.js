module.exports = function(sequelize, DataTypes) {
    var Saved = sequelize.define("Saved", {
      search: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      url: DataTypes.TEXT
    });

    Saved.associate = function(models) {
      
      Saved.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Saved;
  };
  