import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firebaseUID: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: Date; // Added for clarity
  lastLogin: Date; // Added for clarity
}

const UserSchema: Schema = new Schema({
  firebaseUID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

// Ensure the model is not compiled multiple times
// This is crucial to prevent OverwriteModelError
export const User = (mongoose.models.User || mongoose.model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;