import express from 'express';
import upload from '../config/multer.js';
import { subirImagen } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Ruta protegida para subir imagen
router.post('/', protect, upload.single('imagen'), subirImagen);

export default router;