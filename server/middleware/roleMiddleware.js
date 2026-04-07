module.exports = (roles) => {
  return (req, res, next) => {
    // Данные пользователя (req.user) попадают сюда автоматически из authMiddleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Доступ запрещен: недостаточно прав' });
    }
    next(); // Если роль совпадает (например ADMIN), пропускаем дальше
  };
};