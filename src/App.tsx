import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Treinos from "./pages/Treinos";
import Nutricao from "./pages/Nutricao";
import Desafio from "./pages/Desafio";
import Guia from "./pages/Guia";
import Progresso from "./pages/Progresso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/treinos" element={<Treinos />} />
          <Route path="/nutricao" element={<Nutricao />} />
          <Route path="/desafio" element={<Desafio />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="/progresso" element={<Progresso />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
