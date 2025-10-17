import express from 'express';
import {
  obtenerProductos,
  obtenerProductosPorCategoria,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  cambiarVisibilidad
} from '../controllers/productoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/categoria/:id', obtenerProductosPorCategoria);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas (admin)
router.get('/admin/todos', protect, obtenerTodosLosProductos);
router.post('/', protect, crearProducto);
router.put('/:id', protect, actualizarProducto);
router.delete('/:id', protect, eliminarProducto);
router.patch('/:id/visibilidad', protect, cambiarVisibilidad);

export default router;