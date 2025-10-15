// import { MongoClient } from 'mongodb';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// // MongoDB Native Client connection (for getDb)
// let cachedClient: MongoClient | null = null;
// let cachedDb: any = null;

// export async function getDb() {
//   if (cachedDb) {
//     return cachedDb;
//   }

//   if (!cachedClient) {
//     cachedClient = await MongoClient.connect(MONGODB_URI!);
//   }

//   cachedDb = cachedClient.db('AuraUserdata');
//   return cachedDb;
// }

// // Mongoose connection
// export const connectToDb = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       dbName: 'AuraUserdata',
//       // Add these options for debugging
//       socketTimeoutMS: 30000,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// // Cleanup on app termination
// process.on('SIGINT', async () => {
//   if (cachedClient) {
//     await cachedClient.close();
//     await mongoose.connection.close();
//     cachedClient = null;
//     cachedDb = null;
//   }
//   process.exit(0);
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   firebaseUID: String,
//   email: { type: String, required: true, unique: true },
//   name: String,
//   picture: String,
//   createdAt: { type: Date, default: Date.now },
//   lastLogin: { type: Date, default: Date.now }
// });

// export const User = mongoose.model('User', userSchema);
