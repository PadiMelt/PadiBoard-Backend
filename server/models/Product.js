const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  image_url: { type: DataTypes.STRING, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'products', // Имя таблицы в phpMyAdmin
  timestamps: false // Чтобы Sequelize не искал колонки createdAt/updatedAt
});

module.exports = Product;