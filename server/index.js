const app = require('./app.js');
const sequelize = require('./config/db');
const seedAdmin = require('./seeders/adminSeeder');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Синхронизация моделей с БД
    // { alter: false } — не менять структуру таблиц автоматически (безопаснее для данных)
    await sequelize.sync({ alter: false });

    // Запуск сидера для создания админа
    await seedAdmin();

    // Запуск прослушивания порта
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Не удалось запустить сервер:', error);
  }
}

startServer();