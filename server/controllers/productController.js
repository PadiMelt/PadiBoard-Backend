const Product = require('../models/Product');

// 1. Получить все товары (READ)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Sequelize метод для получения всех записей
    res.json(products); // Отправляем список клиенту в формате JSON
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении списка', error: error.message });
  }
};

// 2. Получить один товар (READ)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Поиск по первичному ключу (ID)
    if (!product) return res.status(404).json({ message: 'Товар не найден' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

// 3. Создать товар (CREATE)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body; // Достаем данные из тела запроса

    // Если файл загружен через multer, берем его путь, иначе берем ссылку из текста
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const product = await Product.create({
      name,
      price,
      category,
      image_url,
      stock
    });

    res.status(201).json(product); // 201 — код успешного создания
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании', error: error.message });
  }
};

// 4. Обновить товар (UPDATE)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, image_url, stock } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: 'Товар не найден' });

    // Обновляем поля в базе данных
    await product.update({ name, price, category, image_url, stock });
    res.json({ message: 'Товар обновлен', product });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении', error: error.message });
  }
};

// 5. Удалить товар (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Товар не найден' });

    await product.destroy(); // Удаление записи из таблицы
    res.json({ message: 'Товар успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error: error.message });
  }
};