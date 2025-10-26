import { Product } from "../models/Product.js";

const getAllProducts = async (req, res) => {
  try {
    const items = await Product.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Erreur de validation.", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé." });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Erreur de validation.", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }
    res.status(200).json({ message: "Produit supprimé avec succès.", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};