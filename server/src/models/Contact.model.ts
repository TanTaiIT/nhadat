import mongoose, { Schema } from 'mongoose';

export interface IContactDocument extends mongoose.Document {
  property: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  contactType: 'phone' | 'zalo' | 'message' | 'email';
  message?: string;
  phoneNumber?: string;
  status: 'pending' | 'contacted' | 'interested' | 'not_interested';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactType: {
      type: String,
      enum: ['phone', 'zalo', 'message', 'email'],
      required: true,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'interested', 'not_interested'],
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
ContactSchema.index({ property: 1, createdAt: -1 });
ContactSchema.index({ buyer: 1, createdAt: -1 });
ContactSchema.index({ seller: 1, status: 1, createdAt: -1 });
ContactSchema.index({ createdAt: -1 });

export default mongoose.model<IContactDocument>('Contact', ContactSchema);
