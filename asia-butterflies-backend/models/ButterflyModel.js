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
    enum: [0, 1],          // <-- asegura 0/1
    default: 1
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
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // 🔑 Lo que espera el front:
        if (ret.activity !== undefined && ret.activity !== null) {
          ret.activity = ret.activity === 1 ? "1" : "0";
        }
        if (ret.status !== undefined && ret.status !== null) {
          ret.status = String(ret.status);
        }
        return ret;
      },
    },
  }
);


// Índices para mejorar rendimiento (opcional)
butterflySchema.index({ name: 1 });
butterflySchema.index({ region: 1 });
butterflySchema.index({ status: 1 });

const ButterflyModel = mongoose.model("Butterfly", butterflySchema, "butterflies");

export default ButterflyModel;