import express from 'express';
import { body, query } from 'express-validator';
import {
  getMyProfile,
  updateMyProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  updateUserRole,
  verifyUserIdentity,
  unverifyUserIdentity,
  getUserStatistics,
} from '../controllers/user.controller';
import { protect, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Tên không được để trống'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10,11}$/)
    .withMessage('Số điện thoại không hợp lệ'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email không hợp lệ'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Giới thiệu không được quá 500 ký tự'),
];

const updateUserRoleValidation = [
  body('role')
    .notEmpty()
    .withMessage('Role không được để trống')
    .isIn(['user', 'agent', 'admin'])
    .withMessage('Role không hợp lệ'),
];

const getUsersValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page phải là số nguyên dương'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit phải từ 1 đến 100'),
  query('role')
    .optional()
    .isIn(['user', 'agent', 'admin'])
    .withMessage('Role không hợp lệ'),
];

// ============================================
// User's own profile routes (Protected)
// ============================================
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfileValidation, validate, updateMyProfile);

// ============================================
// Admin routes
// ============================================

// Statistics
router.get('/statistics', protect, authorize('admin'), getUserStatistics);

// User management
router.get(
  '/',
  protect,
  authorize('admin'),
  getUsersValidation,
  validate,
  getUsers
);

router.get('/:id', protect, authorize('admin'), getUserById);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  updateProfileValidation,
  validate,
  updateUser
);

router.delete('/:id', protect, authorize('admin'), deleteUser);

// User status management
router.put('/:id/block', protect, authorize('admin'), blockUser);
router.put('/:id/unblock', protect, authorize('admin'), unblockUser);

// Role management
router.put(
  '/:id/role',
  protect,
  authorize('admin'),
  updateUserRoleValidation,
  validate,
  updateUserRole
);

// Verification management
router.put('/:id/verify', protect, authorize('admin'), verifyUserIdentity);
router.put('/:id/unverify', protect, authorize('admin'), unverifyUserIdentity);

export default router;
