import { Response, NextFunction } from 'express';
import Property from '../models/Property.model';
import { AuthRequest, PaginatedResponse } from '../types';

// @desc    Get all properties
// @route   GET /api/v1/properties
// @access  Public
export const getProperties = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { isActive: true };

    // Filters
    if (req.query.type) query.type = req.query.type;
    if (req.query.status) query.status = req.query.status;
    if (req.query.city) query['address.city'] = req.query.city;
    if (req.query.district) query['address.district'] = req.query.district;

    // Price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice as string);
      if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice as string);
    }

    // Area range
    if (req.query.minArea || req.query.maxArea) {
      query.area = {};
      if (req.query.minArea) query.area.$gte = parseInt(req.query.minArea as string);
      if (req.query.maxArea) query.area.$lte = parseInt(req.query.maxArea as string);
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search as string };
    }

    // Sort
    let sort: any = { createdAt: -1 };
    if (req.query.sort) {
      const sortField = req.query.sort as string;
      sort = { [sortField]: req.query.order === 'asc' ? 1 : -1 };
    }

    // Execute query
    const properties = await Property.find(query)
      .populate('owner', 'name email phone avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(query);

    const response: PaginatedResponse<any> = {
      success: true,
      data: properties,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/v1/properties/:id
// @access  Public
export const getProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'owner',
      'name email phone avatar'
    );

    if (!property) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy bất động sản',
      });
      return;
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/v1/properties
// @access  Private
export const createProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Add owner to req.body
    req.body.owner = req.user?._id;

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Tạo bất động sản thành công',
      data: property,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/v1/properties/:id
// @access  Private
export const updateProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy bất động sản',
      });
      return;
    }

    // Check ownership
    if (property.owner.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Bạn không có quyền cập nhật bất động sản này',
      });
      return;
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Cập nhật bất động sản thành công',
      data: property,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/v1/properties/:id
// @access  Private
export const deleteProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy bất động sản',
      });
      return;
    }

    // Check ownership
    if (property.owner.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Bạn không có quyền xóa bất động sản này',
      });
      return;
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Xóa bất động sản thành công',
      data: {},
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get user properties
// @route   GET /api/v1/properties/user/:userId
// @access  Public
export const getUserProperties = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const properties = await Property.find({
      owner: req.params.userId,
      isActive: true,
    }).populate('owner', 'name email phone avatar');

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error: any) {
    next(error);
  }
};
