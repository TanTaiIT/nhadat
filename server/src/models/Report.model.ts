import mongoose, { Schema } from 'mongoose';

export interface IReportDocument extends mongoose.Document {
  property: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  reason: string;
  reasonType: 'spam' | 'fraud' | 'inappropriate' | 'duplicate' | 'sold' | 'wrong_info' | 'other';
  description?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'rejected';
  reviewedBy?: mongoose.Types.ObjectId;
  reviewNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReportDocument>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Vui lòng chọn lý do báo cáo'],
    },
    reasonType: {
      type: String,
      enum: ['spam', 'fraud', 'inappropriate', 'duplicate', 'sold', 'wrong_info', 'other'],
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'resolved', 'rejected'],
      default: 'pending',
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewNotes: {
      type: String,
      maxlength: 500,
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
ReportSchema.index({ property: 1, status: 1 });
ReportSchema.index({ reporter: 1, createdAt: -1 });
ReportSchema.index({ status: 1, createdAt: -1 });
ReportSchema.index({ reviewedBy: 1 });

export default mongoose.model<IReportDocument>('Report', ReportSchema);
