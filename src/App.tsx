import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";  // 👈 changed to HashRouter
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

console.log("Rendering App.jsx");

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/workspace" element={<Workspace />} />
        {/* catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
    <Toaster />
  </QueryClientProvider>
);


export default App;
