import mongoose, { Schema } from 'mongoose';

export interface IFavoriteDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<IFavoriteDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Đảm bảo một user chỉ có thể lưu một property một lần
FavoriteSchema.index({ user: 1, property: 1 }, { unique: true });

// Index để query nhanh
FavoriteSchema.index({ user: 1, createdAt: -1 });
FavoriteSchema.index({ property: 1 });

export default mongoose.model<IFavoriteDocument>('Favorite', FavoriteSchema);
