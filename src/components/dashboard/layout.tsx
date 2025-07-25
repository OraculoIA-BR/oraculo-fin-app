// src/components/dashboard/layout.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { Header } from "@/components/dashboard/header";
import { WhatsAppFAB } from "@/components/dashboard/whatsapp-fab";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Logo />
        <Loader2 className="h-10 w-10 animate-spin text-primary mt-4" />
        <p className="text-gray-500 mt-2">Carregando seu dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <WhatsAppFAB />
    </div>
  );
};
