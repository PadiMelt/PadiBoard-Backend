const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация нового пользователя
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем через базу, не занята ли почта
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хешируем пароль (превращаем в случайный набор символов)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя в таблице 'users'
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'CLIENT' // Роль по умолчанию
    });

    res.status(201).json({ message: 'Пользователь создан' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message });
  }
};

// Логин (Вход в систему)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по почте
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Сравниваем пароль из запроса с хешем в базе данных
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Если всё верно — создаем JWT токен
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Данные, которые "в зашитом" виде будут в токене
      process.env.JWT_SECRET, // Наш секретный ключ из .env
      { expiresIn: '24h' } // Срок действия ключа
    );

    // Отправляем токен и краткие данные пользователя на фронтенд
    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка входа', error: error.message });
  }
};