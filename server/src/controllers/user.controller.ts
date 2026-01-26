import { Response, NextFunction } from 'express';
import User from '../models/User.model';
import { ApiResponse, AuthRequest, IUserDocument, PaginatedResponse } from '../types';

// @desc    Get current user profile
// @route   GET /api/v1/users/me
// @access  Private
export const getMyProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/v1/users/me
// @access  Private
export const updateMyProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      phone,
      zaloNumber,
      avatar,
      address,
      bio,
      agentInfo,
    } = req.body;

    const fieldsToUpdate: any = {};

    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (zaloNumber) fieldsToUpdate.zaloNumber = zaloNumber;
    if (avatar) fieldsToUpdate.avatar = avatar;
    if (address) fieldsToUpdate.address = address;
    if (bio) fieldsToUpdate.bio = bio;
    if (agentInfo && req.user?.role === 'agent') {
      fieldsToUpdate.agentInfo = agentInfo;
    }

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const filters: any = {};
    
    if (req.query.role) {
      filters.role = req.query.role;
    }
    
    if (req.query.isActive !== undefined) {
      filters.isActive = req.query.isActive === 'true';
    }
    
    if (req.query.isVerified !== undefined) {
      filters.isVerified = req.query.isVerified === 'true';
    }

    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Sort
    let sort: any = { createdAt: -1 };
    if (req.query.sort) {
      const sortField = req.query.sort as string;
      const sortOrder = req.query.order === 'asc' ? 1 : -1;
      sort = { [sortField]: sortOrder };
    }

    const total = await User.countDocuments(filters);
    const users = await User.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-password');

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    } as PaginatedResponse<IUserDocument>);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUserById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('req', req)
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      zaloNumber,
      avatar,
      address,
      bio,
      agentInfo,
      verification,
      statistics,
    } = req.body;

    const fieldsToUpdate: any = {};

    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (phone) fieldsToUpdate.phone = phone;
    if (zaloNumber) fieldsToUpdate.zaloNumber = zaloNumber;
    if (avatar) fieldsToUpdate.avatar = avatar;
    if (address) fieldsToUpdate.address = address;
    if (bio) fieldsToUpdate.bio = bio;
    if (agentInfo) fieldsToUpdate.agentInfo = agentInfo;
    if (verification) fieldsToUpdate.verification = verification;
    if (statistics) fieldsToUpdate.statistics = statistics;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      res.status(403).json({
        success: false,
        message: 'Không thể xóa tài khoản admin',
      } as ApiResponse);
      return;
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa người dùng thành công',
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Block user (Admin only)
// @route   PUT /api/v1/users/:id/block
// @access  Private/Admin
export const blockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    // Prevent blocking admin users
    if (user.role === 'admin') {
      res.status(403).json({
        success: false,
        message: 'Không thể chặn tài khoản admin',
      } as ApiResponse);
      return;
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Chặn người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Unblock user (Admin only)
// @route   PUT /api/v1/users/:id/unblock
// @access  Private/Admin
export const unblockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Bỏ chặn người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/v1/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'agent', 'admin'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Role không hợp lệ. Chỉ chấp nhận: user, agent, admin',
      } as ApiResponse);
      return;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    // Prevent changing own role
    if (user.id === req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Không thể thay đổi quyền của chính mình',
      } as ApiResponse);
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật quyền người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify user identity (Admin only)
// @route   PUT /api/v1/users/:id/verify
// @access  Private/Admin
export const verifyUserIdentity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    if (!user.verification) {
      user.verification = {};
    }

    user.verification.isIdentityVerified = true;
    user.verification.verifiedAt = new Date();
    user.verification.verifiedBy = req.user?.id;
    user.isVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Xác thực danh tính người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Unverify user identity (Admin only)
// @route   PUT /api/v1/users/:id/unverify
// @access  Private/Admin
export const unverifyUserIdentity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    if (user.verification) {
      user.verification.isIdentityVerified = false;
      user.verification.verifiedAt = undefined;
      user.verification.verifiedBy = undefined;
    }
    user.isVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Hủy xác thực danh tính người dùng thành công',
      data: user,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics (Admin only)
// @route   GET /api/v1/users/statistics
// @access  Private/Admin
export const getUserStatistics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('req', req)
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        verifiedUsers,
        inactiveUsers: totalUsers - activeUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
        usersByRole: usersByRole.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {} as Record<string, number>),
        newUsersThisMonth,
      },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};
