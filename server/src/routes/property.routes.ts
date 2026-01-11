import express from 'express';
import { body } from 'express-validator';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
} from '../controllers/property.controller';
import { protect, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = express.Router();

// Validation rules
const propertyValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Tiêu đề không được để trống')
    .isLength({ max: 200 })
    .withMessage('Tiêu đề không được quá 200 ký tự'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Mô tả không được để trống'),
  body('price')
    .isNumeric()
    .withMessage('Giá phải là số')
    .custom(value => value > 0)
    .withMessage('Giá phải lớn hơn 0'),
  body('area')
    .isNumeric()
    .withMessage('Diện tích phải là số')
    .custom(value => value > 0)
    .withMessage('Diện tích phải lớn hơn 0'),
  body('type')
    .isIn(['apartment', 'house', 'land', 'villa', 'office'])
    .withMessage('Loại bất động sản không hợp lệ'),
  body('address.street').notEmpty().withMessage('Địa chỉ đường không được để trống'),
  body('address.ward').notEmpty().withMessage('Phường/xã không được để trống'),
  body('address.district').notEmpty().withMessage('Quận/huyện không được để trống'),
  body('address.city').notEmpty().withMessage('Tỉnh/thành phố không được để trống'),
  body('images').isArray({ min: 1 }).withMessage('Phải có ít nhất 1 hình ảnh'),
];

// Routes
router.route('/')
  .get(getProperties)
  .post(protect, authorize('agent', 'admin'), propertyValidation, validate, createProperty);

router.route('/:id')
  .get(getProperty)
  .put(protect, authorize('agent', 'admin'), updateProperty)
  .delete(protect, authorize('agent', 'admin'), deleteProperty);

router.get('/user/:userId', getUserProperties);

export default router;
