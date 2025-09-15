import ButterflyModel from "../models/ButterflyModel.js";
import mongoose from "mongoose";

export const getAllButterflies = async (req, res) => {
  try {
    const butterflies = await ButterflyModel.find();
    res.status(200).json(butterflies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Trae una mariposa
export const getOneButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    
    const butterfly = await ButterflyModel.findById(id);
    if (!butterfly) {
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }
    res.status(200).json(butterfly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Crea una mariposa
export const createButterfly = async (req, res) => {
  try {
    const { 
      name, 
      sciname, 
      shortDescription, 
      longDescription, 
      activity, 
      status, 
      region, 
      location, 
      imageUrl 
    } = req.body;

    const newButterfly = new ButterflyModel({
      name,
      sciname,
      shortDescription,
      longDescription,
      activity,
      status,
      region,
      location,
      imageUrl,
    });

    const savedButterfly = await newButterfly.save();
    res.status(201).json(savedButterfly);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Error de validación", 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: "Error al crear la mariposa" });
  }
};

// Actualiza una mariposa por ID
export const updateButterfly = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    
    const {
      name,
      sciname,
      shortDescription,
      longDescription,
      activity,
      status,
      region,
      location,
      imageUrl,
    } = req.body;

    // Filtrar campos undefined para evitar sobrescribirlos
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (sciname !== undefined) updateData.sciname = sciname;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (longDescription !== undefined) updateData.longDescription = longDescription;
    if (activity !== undefined) updateData.activity = activity;
    if (status !== undefined) updateData.status = status;
    if (region !== undefined) updateData.region = region;
    if (location !== undefined) updateData.location = location;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const updatedButterfly = await ButterflyModel.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, // Retorna el documento actualizado
        runValidators: true // Ejecuta las validaciones del schema
      }
    );

    if (!updatedButterfly) {
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }

    res.status(200).json(updatedButterfly);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Error de validación", 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// 🦋 Eliminar una mariposa por su ID
export const deleteButterfly = async (req, res) => {
  try {
    // Tomar el "id" de la URL
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    // Buscar y eliminar la mariposa en la base de datos
    const deletedButterfly = await ButterflyModel.findByIdAndDelete(id);

    // Comprobar si no se encuentra la mariposa
    if (!deletedButterfly) {
      // Enviar error 404 si no existe
      return res.status(404).json({ error: "Mariposa no encontrada" });
    }

    // Enviar mensaje de éxito
    res.status(200).json({ message: "Mariposa eliminada correctamente" });
  } catch (error) {
    // Mostrar el error en consola
    console.error(error);

    // Enviar error 500 si falla la operación
    res.status(500).json({ error: "Error al eliminar la mariposa" });
  }
};