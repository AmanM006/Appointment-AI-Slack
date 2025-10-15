// src/authHelpers.js
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "./firebase";

export const signInWithGoogle = () => {
  return signInWithRedirect(auth, provider);
};

export const handleRedirectResult = async () => {
  const result = await getRedirectResult(auth);
  return result?.user || null;
};
