const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    // Проверяем, есть ли уже админ, чтобы не плодить дубликаты при каждом перезапуске
    const adminExists = await User.findOne({ where: { email: 'admin@green.com' } });

    if (!adminExists) {
      // Хешируем пароль для безопасности
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await User.create({
        email: 'admin@green.com',
        password: hashedPassword,
        role: 'ADMIN'
      });

      console.log('Сидер: Админ успешно создан (admin@green.com / admin123)');
    } else {
      console.log('Сидер: Админ уже существует в базе данных');
    }
  } catch (error) {
    console.error('Ошибка сидера:', error.message);
  }
};

module.exports = seedAdmin;