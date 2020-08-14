// Expenses module for expenses table
module.exports = function(sequelize, DataTypes) {
  const Expenses = sequelize.define("Expenses", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Expenses.associate = function(models) {
    // Expenses should belong to a category
    // Expenses can't be created without a category due to the foreign key constraint
    Expenses.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      }
    });
  };
  return Expenses;
};
