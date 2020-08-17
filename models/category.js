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

  Category.associate = function(models) {
    Category.hasMany(models.Expenses, {
      onDelete: "cascade"
    });
  };
  return Category;
};
