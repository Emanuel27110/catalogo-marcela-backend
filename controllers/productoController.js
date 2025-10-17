import Producto from '../models/Producto.js';

// @desc    Obtener todos los productos visibles (para clientes)
// @route   GET /api/productos
// @access  Público
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ visible: true })
      .populate('categoria', 'nombre')
      .sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// @desc    Obtener productos por categoría (visibles)
// @route   GET /api/productos/categoria/:id
// @access  Público
export const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const productos = await Producto.find({ 
      categoria: req.params.id,
      visible: true 
    })
      .populate('categoria', 'nombre')
      .sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// @desc    Obtener TODOS los productos (para admin, incluyendo ocultos)
// @route   GET /api/productos/admin
// @access  Privado/Admin
export const obtenerTodosLosProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
      .populate('categoria', 'nombre')
      .sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
// @access  Público
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria', 'nombre');
    
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: error.message });
  }
};

// @desc    Crear nuevo producto
// @route   POST /api/productos
// @access  Privado/Admin
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, talles, imagen, descripcion, categoria, visible } = req.body;

    const producto = await Producto.create({
      nombre,
      precio,
      talles,
      imagen,
      descripcion,
      categoria,
      visible: visible !== undefined ? visible : true
    });

    const productoConCategoria = await Producto.findById(producto._id).populate('categoria', 'nombre');
    res.status(201).json(productoConCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

// @desc    Actualizar producto
// @route   PUT /api/productos/:id
// @access  Privado/Admin
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const { nombre, precio, talles, imagen, descripcion, categoria, visible } = req.body;

    producto.nombre = nombre || producto.nombre;
    producto.precio = precio !== undefined ? precio : producto.precio;
    producto.talles = talles !== undefined ? talles : producto.talles;
    producto.imagen = imagen || producto.imagen;
    producto.descripcion = descripcion !== undefined ? descripcion : producto.descripcion;
    producto.categoria = categoria || producto.categoria;
    producto.visible = visible !== undefined ? visible : producto.visible;

    const productoActualizado = await producto.save();
    const productoConCategoria = await Producto.findById(productoActualizado._id).populate('categoria', 'nombre');
    
    res.json(productoConCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

// @desc    Eliminar producto
// @route   DELETE /api/productos/:id
// @access  Privado/Admin
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.deleteOne();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

// @desc    Ocultar/Mostrar producto (cambiar visibilidad)
// @route   PATCH /api/productos/:id/visibilidad
// @access  Privado/Admin
export const cambiarVisibilidad = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.visible = !producto.visible;
    const productoActualizado = await producto.save();
    
    res.json({
      mensaje: `Producto ${productoActualizado.visible ? 'mostrado' : 'ocultado'} correctamente`,
      producto: productoActualizado
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar visibilidad', error: error.message });
  }
};