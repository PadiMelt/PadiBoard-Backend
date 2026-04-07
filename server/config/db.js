const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем экземпляр подключения к БД
const sequelize = new Sequelize(
  process.env.DB_NAME, // Берем имя БД из .env
  process.env.DB_USER, // Логин
  process.env.DB_PASSWORD, // Пароль
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Чтобы не засорять консоль логами SQL запросов
  }
);

// Функция для проверки, что мы реально подключились
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с БД установлено успешно');
  } catch (error) {
    console.error('Ошибка подключения к БД:', error);
  }
};

testConnection();

module.exports = sequelize;