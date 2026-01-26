import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  updatePassword,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Tên không được để trống'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10,11}$/)
    .withMessage('Số điện thoại không hợp lệ'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
];

const updatePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự'),
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token không được để trống'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password', resetPasswordValidation, validate, resetPassword);

// Protected routes (require authentication)
router.post('/logout', protect, logout);
router.put('/updatepassword', protect, updatePasswordValidation, validate, updatePassword);

export default router;
