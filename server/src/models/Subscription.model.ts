import mongoose, { Schema } from 'mongoose';

export interface ISubscriptionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  amount: number;
  propertiesUsed: number; // Số tin đã đăng
  propertiesLimit: number; // Giới hạn tin đăng
  autoRenew: boolean;
  cancelledAt?: Date;
  cancelReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'pending'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    propertiesUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    propertiesLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
    cancelledAt: {
      type: Date,
    },
    cancelReason: {
      type: String,
      maxlength: 500,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
SubscriptionSchema.index({ user: 1, status: 1, endDate: -1 });
SubscriptionSchema.index({ status: 1, endDate: 1 });
SubscriptionSchema.index({ package: 1 });
SubscriptionSchema.index({ transactionId: 1 });
SubscriptionSchema.index({ endDate: 1 });

export default mongoose.model<ISubscriptionDocument>('Subscription', SubscriptionSchema);
