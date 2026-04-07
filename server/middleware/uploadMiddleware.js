const multer = require('multer');
const path = require('path');

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Важно: папка uploads должна быть создана в корне проекта!
  },
  filename: (req, file, cb) => {
    // Создаем уникальное имя файла: дата-рандом-оригинальное_имя
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Фильтр файлов (разрешаем только изображения)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Только изображения разрешены для загрузки!'), false);
  }
};

// Создаем объект загрузчика
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Лимит размера одного файла: 5МБ
});

module.exports = upload;