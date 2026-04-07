const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Подключаем middleware для защиты путей
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// --- Маршруты, доступные всем ---
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// --- Маршруты только для ADMIN ---
// (Сначала проверяем токен, потом роль, потом загружаем фото, потом вызываем контроллер)

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  upload.single('image'), // Ожидаем файл в поле 'image'
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  upload.single('image'),
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  productController.deleteProduct
);

module.exports = router;