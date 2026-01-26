import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { ApiResponse, AuthRequest } from '../types';
import { verifyRefreshToken } from '../utils/jwt';
import { generateResetToken, hashToken } from '../utils/crypto';
import { sendPasswordResetEmail } from '../utils/sendEmail';

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng',
      } as ApiResponse);
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Generate tokens
    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          emailVerified: user.isVerified,
          phoneVerified: false,
          profile: {
            firstName: user.name.split(' ')[0] || '',
            lastName: user.name.split(' ').slice(1).join(' ') || '',
            fullName: user.name,
            avatar: user.avatar,
            phone: user.phone,
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
        refreshToken,
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
      },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu',
      } as ApiResponse);
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
      } as ApiResponse);
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
      } as ApiResponse);
      return;
    }

    // Generate tokens
    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          emailVerified: user.isVerified,
          phoneVerified: false,
          profile: {
            firstName: user.name.split(' ')[0] || '',
            lastName: user.name.split(' ').slice(1).join(' ') || '',
            fullName: user.name,
            avatar: user.avatar,
            phone: user.phone,
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
        refreshToken,
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
      },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
export const updatePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('+password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      } as ApiResponse);
      return;
    }

    // Check current password
    const isMatch = await user.comparePassword(req.body.currentPassword);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng',
      } as ApiResponse);
      return;
    }

    user.password = req.body.newPassword;
    await user.save();

    const accessToken = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Đổi mật khẩu thành công',
      data: { accessToken },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // In a real application, you might want to:
    // 1. Blacklist the token
    // 2. Clear refresh token from database
    // 3. Clear cookies if using cookie-based auth

    res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công',
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
// @access  Public
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token không được để trống',
      } as ApiResponse);
      return;
    }

    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);

      // Get user
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Người dùng không tồn tại',
        } as ApiResponse);
        return;
      }

      // Generate new access token
      const accessToken = user.getSignedJwtToken();

      res.status(200).json({
        success: true,
        message: 'Làm mới token thành công',
        data: {
          accessToken,
          expiresIn: 7 * 24 * 60 * 60,
        },
      } as ApiResponse);
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Refresh token không hợp lệ hoặc đã hết hạn',
      } as ApiResponse);
      return;
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email',
      } as ApiResponse);
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng với email này',
      } as ApiResponse);
      return;
    }

    // Generate reset token
    const resetToken = generateResetToken();

    // Hash token and save to database
    user.resetPasswordToken = hashToken(resetToken);
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save({ validateBeforeSave: false });

    try {
      // Send email
      await sendPasswordResetEmail(
        user.email,
        resetToken,
        process.env.FRONTEND_URL || 'http://localhost:3000'
      );

      res.status(200).json({
        success: true,
        message: 'Email đặt lại mật khẩu đã được gửi',
      } as ApiResponse);
    } catch (emailError) {
      // Reset fields if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      console.error('Email error:', emailError);
      res.status(500).json({
        success: false,
        message: 'Không thể gửi email. Vui lòng thử lại sau.',
      } as ApiResponse);
      return;
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword
// @access  Public
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp token và mật khẩu mới',
      } as ApiResponse);
      return;
    }

    // Hash the token to compare with database
    const hashedToken = hashToken(token);

    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
      } as ApiResponse);
      return;
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Generate new tokens
    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();

    res.status(200).json({
      success: true,
      message: 'Đặt lại mật khẩu thành công',
      data: {
        accessToken,
        refreshToken,
      },
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};
