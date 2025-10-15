import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GoogleIcon from '@/components/icons/GoogleIcon';
import AppleIcon from '@/components/icons/AppleIcon';
import { auth, googleProvider } from '@/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

// Form validation schema
const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User already signed in
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/workspace");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send to MongoDB via your backend
      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        }),
      });

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/workspace");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Check console.");
    }
  };

  function onSubmit(data: SignupFormValues) {
    console.log("Form submitted:", data);
    toast.success("Account created successfully!", {
      description: "Welcome to AuraAI! You can now log in.",
    });
    setTimeout(() => navigate('/'), 1500);
  }

  return (
    <div className="min-h-screen bg-background gradient-bg flex flex-col items-center justify-center px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20" />
        <div className="absolute left-1/4 bottom-1/4 w-96 h-96 bg-purple-700 rounded-full blur-[150px] opacity-20" />
        <div className="absolute left-1/2 top-1/3 w-64 h-64 bg-purple-300 rounded-full blur-[100px] opacity-10" />
      </div>
      <div className="absolute top-6 left-6">
        <span className="text-gray-400 text-sm align-middle">Back</span> {/* Added align-middle */}
        <Link to="/." className="text-purple-400 hover:text-purple-300 hover:underline text-sm transition-colors ml-2 ">
          <FontAwesomeIcon icon={faCircleChevronLeft} style={{ fontSize: '18px' }} className="align-middle" /> {/* Added align-middle */}
        </Link>
      </div>
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold text-purple-400">Aura</span>
            <span className="text-3xl font-light text-white">AI</span>
          </Link>
        </div>
        
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enter your email to sign up</h1>
          <p className="text-gray-400">Or choose another option</p>
        </div>
        
        {/* Email form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="name@work-email.com" 
                      {...field} 
                      className="h-12 text-base bg-secondary border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium text-base rounded-md transition-colors">
              Continue
            </Button>
          </form>
        </Form>
        
        {/* Divider */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-500 font-medium">OTHER OPTIONS</span>
        </div>
        
        {/* Social login buttons */}
        <div className="flex gap-3 mb-8">
          <Button 
            onClick={handleGoogleSignUp}
            variant="outline" 
            className="flex-1 h-12 bg-white border-gray-600 text-gray-800 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-medium text-base flex items-center justify-center gap-3 transition-all px-4"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <GoogleIcon />
            </div>
            <span>Google</span>
          </Button>
        
          <Button 
            variant="outline" 
            className="flex-1 h-12 bg-white border-gray-600 text-gray-800 hover:bg-black font-medium text-base flex items-center justify-center gap-3 transition-colors px-4"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <AppleIcon />
            </div>
            <span>Apple</span>
          </Button>
        </div>
                
        
        {/* Sign in link */}
        <div className="text-center text-gray-400">
          <span>Already using AuraAI? </span>
          <Link to="/signin" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
            Sign in to an existing workspace
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <Link to="#" className="hover:text-gray-400 transition-colors">Privacy & Terms</Link>
          <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact Us</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;