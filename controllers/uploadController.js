// @desc    Subir imagen
// @route   POST /api/upload
// @access  Privado/Admin
export const subirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se envió ninguna imagen' });
    }

    // URL de la imagen subida
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      mensaje: 'Imagen subida correctamente',
      imagen: imageUrl,
      nombreArchivo: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al subir imagen', 
      error: error.message 
    });
  }
};