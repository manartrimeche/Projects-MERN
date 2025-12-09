const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents,
} = require('../controllers/courseController');
const {
  addReview,
  getCourseReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Routes pour les cours
// GET (browse) = Public, POST (create) = Protected
router.route('/')
  .post(protect, createCourse)
  .get(getCourses);
router.route('/:id').get(getCourseById);

// Routes pour les inscriptions (Relation Many-to-Many) - protégées par JWT
router.route('/:courseId/enroll').post(protect, enrollUserInCourse);
router.route('/:courseId/students').get(getCourseStudents);

// Routes pour les critiques (Relation 1-to-Many)
// GET (read) = Public, POST (create) = Protected
router.route('/:courseId/reviews')
  .post(protect, addReview)
  .get(getCourseReviews);

module.exports = router;