import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GoogleIcon from '@/components/icons/GoogleIcon';
import AppleIcon from '@/components/icons/AppleIcon';
import { auth, signInWithGoogle } from '../firebase';
import { GoogleAuthProvider, getRedirectResult } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();

  // in useEffect
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect sign-in result:", result.user);
        } else {
          console.log("No redirect result");
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });
  }, []);

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle(); // Redirect starts here
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Google Sign Up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-bg flex flex-col items-center justify-center px-4 relative">
      {/* Background circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-purple-700 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="w-full max-w-md">
        {/* Top Nav */}
        <div className="absolute top-6 right-6">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <Link to="/signin" className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors">
            Sign In
          </Link>
        </div>
        <div className="absolute top-6 left-6">
          <span className="text-gray-400 text-sm">Back</span>
          <Link to="/" className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors ml-2">
            <FontAwesomeIcon icon={faCircleChevronLeft} style={{ fontSize: '18px' }} />
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold text-purple-400">Aura</span>
            <span className="text-3xl font-light text-white">AI</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create your AuraAI account</h1>
          <p className="text-gray-400">Use Google or Apple to sign up.</p>
        </div>

        {/* Google/Apple Signup */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleGoogleSignup}
            className="flex-1 h-12 bg-white border-gray-600 text-gray-800 hover:bg-black hover:shadow-md font-medium text-base flex items-center justify-center gap-3 rounded px-4 transition-all"
          >
            <div className="w-6 h-6 flex items-center justify-center"><GoogleIcon /></div>
            <span>Google</span>
          </button>

          <button
            disabled
            className="flex-1 h-12 bg-white border-gray-600 text-gray-800 font-medium text-base flex items-center justify-center gap-3 rounded px-4 transition-all opacity-50 cursor-not-allowed"
          >
            <div className="w-6 h-6 flex items-center justify-center"><AppleIcon /></div>
            <span>Apple</span>
          </button>
        </div>

        <div className="text-center text-gray-400">
          <span>Need help? </span>
          <Link to="/contact" className="text-purple-400 hover:text-purple-300 hover:underline">Contact Us</Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <Link to="#" className="hover:text-gray-400">Privacy & Terms</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
          <button className="hover:text-gray-400">🌐 Change region</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
