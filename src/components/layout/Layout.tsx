
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { direction } = useLanguage();

  // Close sidebar on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("main-sidebar");
      const sidebarButton = document.getElementById("sidebar-toggle");
      if (
        isSidebarOpen &&
        sidebar && 
        sidebarButton &&
        !sidebar.contains(event.target as Node) &&
        !sidebarButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className={cn("min-h-screen bg-background text-white", direction === "rtl" ? "rtl" : "ltr")}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={cn(
        "transition-all duration-300 pt-16",
        direction === "rtl" ? "lg:pr-12" : "lg:pl-12"
      )}>
        <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
