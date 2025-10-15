// // firebase-login-handler.ts

// import { adminAuth } from './firebase-admin';
// import { getDb } from './db';
// import type { Request, Response } from 'express';

// async function saveUserToDatabase({ uid, email, name, picture }: any) {
//   const db = await getDb();
//   const users = db.collection('users');
  
//   const existing = await users.findOne({ email });
//   if (existing) {
//     return existing;
//   }

//   const result = await users.insertOne({ uid, email, name, picture });
//   if (result.insertedId) {
//     return await users.findOne({ _id: result.insertedId });
//   }
//   return { uid, email, name, picture };
// }

// export const handleFirebaseLogin = async (req: Request, res: Response) => {
//   const { idToken } = req.body;

//   try {
//     const decodedToken = await adminAuth.verifyIdToken(idToken);
//     const { uid, email, name, picture } = decodedToken;

//     const user = await saveUserToDatabase({ uid, email, name, picture });
//     res.json({ user });
//   } catch (error) {
//     console.error('Firebase login error:', error);
//     res.status(500).json({ error: 'Authentication failed' });
//   }
// };
