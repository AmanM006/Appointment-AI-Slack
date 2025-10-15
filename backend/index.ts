// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectToDb } from './db';
// import { adminAuth } from './firebase-admin';

// dotenv.config();

// const app = express();

// // Enable CORS
// app.use(cors({
//   origin: 'http://localhost:5173', // or your frontend URL
//   credentials: true
// }));

// app.use(express.json());

// // Test endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok' });
// });

// // Google signup endpoint
// app.post('/api/auth/google-signup', async (req, res) => {
//   console.log('[DEBUG] Received signup request');
//   try {
//     const { idToken } = req.body;
//     if (!idToken) {
//       return res.status(400).json({ message: 'No ID token provided' });
//     }

//     const decodedToken = await adminAuth.verifyIdToken(idToken);
//     console.log('[DEBUG] Verified token for:', decodedToken.email);

//     // Add your MongoDB logic here
//     res.status(201).json({ message: 'Signup successful' });
//   } catch (error) {
//     console.error('[ERROR] Signup failed:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 3001;

// // Connect to MongoDB and start server
// connectToDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }).catch(err => {
//   console.error('Failed to connect to MongoDB:', err);
// });