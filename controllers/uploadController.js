// @desc    Subir imagen a Cloudinary
// @route   POST /api/upload
// @access  Privado/Admin
export const subirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se envió ninguna imagen' });
    }

    // Cloudinary ya subió el archivo, multer nos da la URL completa
    const imageUrl = req.file.path; // URL completa de Cloudinary

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