import mongoose from "mongoose";

const butterflySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    maxlength: 255,
    trim: true
  },
  sciname: { 
    type: String, 
    required: false,
    maxlength: 255,
    trim: true
  },
  shortDescription: { 
    type: String, 
    required: false,
    maxlength: 1000,
    trim: true
  },
  longDescription: { 
    type: String, 
    required: true,
    trim: true
  },
  activity: { 
    type: Number, 
    required: false,
    min: 0,
    max: 255
  },
  status: { 
    type: Number, 
    required: false,
    min: 0,
    max: 255
  },
  region: { 
    type: String, 
    required: false,
    maxlength: 255,
    trim: true
  },
  location: { 
    type: String, 
    required: false,
    maxlength: 255,
    trim: true
  },
  imageUrl: { 
    type: String, 
    required: false,
    maxlength: 2048,
    trim: true,
    validate: {
      validator: function(v) {
       return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'imageUrl debe ser una URL válida'
    }
  }
}, {
  timestamps: false, // Si quieres mantener sin timestamps como en Sequelize
  // timestamps: true, // Si quieres createdAt y updatedAt automáticos
  versionKey: false // Elimina el campo __v
});

// Índices para mejorar rendimiento (opcional)
butterflySchema.index({ name: 1 });
butterflySchema.index({ region: 1 });
butterflySchema.index({ status: 1 });

const ButterflyModel = mongoose.model("Butterfly", butterflySchema, "butterflies");

export default ButterflyModel;