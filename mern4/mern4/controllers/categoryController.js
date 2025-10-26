import { Category } from '../models/Category.js';

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent', 'name');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    await category.populate('parent', 'name');
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de validation.', error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parent', 'name');
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).populate('parent', 'name');
    
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de validation.', error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée.' });
    }
    res.status(200).json({ message: 'Catégorie supprimée avec succès.', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};