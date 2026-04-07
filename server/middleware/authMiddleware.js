const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Извлекаем токен из заголовка Authorization (формат "Bearer TOKEN")
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Нет авторизации' });
  }

  const token = authHeader.split(' ')[1]; // Берем только сам токен

  try {
    // Проверяем токен с помощью секретного ключа из .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Добавляем данные пользователя (id, role) в объект запроса
    next(); // Идем дальше к следующей функции
  } catch (e) {
    res.status(401).json({ message: 'Токен не валиден' });
  }
};