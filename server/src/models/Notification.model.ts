import mongoose, { Schema } from 'mongoose';

export interface INotificationDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: 'property' | 'contact' | 'subscription' | 'system' | 'message' | 'favorite' | 'price_change';
  title: string;
  message: string;
  relatedProperty?: mongoose.Types.ObjectId;
  relatedUser?: mongoose.Types.ObjectId;
  link?: string;
  icon?: string;
  isRead: boolean;
  readAt?: Date;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotificationDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['property', 'contact', 'subscription', 'system', 'message', 'favorite', 'price_change'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề'],
      trim: true,
      maxlength: [200, 'Tiêu đề không được quá 200 ký tự'],
    },
    message: {
      type: String,
      required: [true, 'Vui lòng nhập nội dung'],
      maxlength: [1000, 'Nội dung không được quá 1000 ký tự'],
    },
    relatedProperty: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    relatedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    link: {
      type: String,
    },
    icon: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal',
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ user: 1, type: 1, createdAt: -1 });
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Tự động xóa sau 30 ngày

export default mongoose.model<INotificationDocument>('Notification', NotificationSchema);
