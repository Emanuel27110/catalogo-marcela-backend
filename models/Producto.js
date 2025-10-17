import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  talles: {
    type: [String],
    default: []
  },
  imagen: {
    type: String,
    default: ''
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria']
  }
}, {
  timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;