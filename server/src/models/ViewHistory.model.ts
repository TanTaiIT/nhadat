import mongoose, { Schema } from 'mongoose';

export interface IViewHistoryDocument extends mongoose.Document {
  user?: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  viewDuration?: number; // Thời gian xem (giây)
  createdAt: Date;
  updatedAt: Date;
}

const ViewHistorySchema = new Schema<IViewHistoryDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    sessionId: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    viewDuration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query lịch sử xem của user
ViewHistorySchema.index({ user: 1, createdAt: -1 });
ViewHistorySchema.index({ property: 1, createdAt: -1 });
ViewHistorySchema.index({ sessionId: 1, property: 1 });
ViewHistorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // Tự động xóa sau 90 ngày

export default mongoose.model<IViewHistoryDocument>('ViewHistory', ViewHistorySchema);
