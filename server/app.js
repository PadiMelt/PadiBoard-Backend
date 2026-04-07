const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); // Импорт ваших роутов
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors()); // Разрешаем запросы с других доменов (например, с вашего фронтенда на Vite)
app.use(express.json()); // Позволяем серверу понимать JSON в теле запроса (req.body)

// Статика для картинок
// Делаем папку 'uploads' публичной, чтобы картинки были доступны по ссылке: http://localhost:5000/uploads/имя_файла.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Регистрация маршрутов API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Базовый маршрут для проверки работоспособности в браузере
app.get('/', (req, res) => {
  res.send('PadiBoard API запущен...');
});

module.exports = app;