// Category module for categories table
module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Category;
};
