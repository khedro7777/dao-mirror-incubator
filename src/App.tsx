
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import KycVerification from "./pages/KycVerification";
import CreateContract from "./pages/CreateContract";
import ContractDetail from "./pages/ContractDetail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import VotingPage from "./pages/VotingPage";
import ProposalsPage from "./pages/ProposalsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/kyc" element={<KycVerification />} />
              <Route path="/contracts/create" element={<CreateContract />} />
              <Route path="/contracts/:id" element={<ContractDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/voting" element={<VotingPage />} />
              <Route path="/proposals" element={<ProposalsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
