
import React, { useState, useEffect } from "react";
import { 
  Home, 
  Users, 
  FileText, 
  Clock, 
  Settings, 
  Menu,
  X,
  Info,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { direction } = useLanguage();
  const { t } = useTranslation();
  
  // Close sidebar on route change or if screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Keep sidebar open on desktop
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const closeSidebar = () => setIsOpen(false);

  const navigation = [
    { name: t('home'), icon: Home, href: "/" },
    { name: t('explore'), icon: Users, href: "/explore" },
    { name: t('contracts'), icon: FileText, href: "/contracts" },
    { name: t('activity'), icon: Clock, href: "/activity" },
    { name: t('settings'), icon: Settings, href: "/settings" },
  ];

  const gateways = [
    { name: t('groupBuying'), href: "/gateway/group-buying" },
    { name: t('funding'), href: "/gateway/funding" },
    { name: t('freelance'), href: "/gateway/freelance" },
  ];

  const support = [
    { name: "About Us", icon: Info, href: "/about" },
    { name: "Contact", icon: MessageSquare, href: "/contact" },
    { name: "FAQ", icon: HelpCircle, href: "/faq" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar for mobile */}
      <aside
        className={cn(
          "sidebar-container lg:hidden",
          isOpen ? "open" : "closed",
          direction === "rtl" && "right-0 left-auto"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
          <h2 className="text-xl font-bold text-white">{t('appName')}</h2>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                onClick={(e) => {
                  if (window.innerWidth < 1024) closeSidebar();
                }}
              >
                <item.icon className={cn("h-5 w-5", direction === "rtl" ? "ml-3" : "mr-3")} />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {t('exploreGateways')}
            </h3>
            <nav className="mt-2 space-y-1">
              {gateways.map((gateway) => (
                <a
                  key={gateway.name}
                  href={gateway.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                  onClick={(e) => {
                    if (window.innerWidth < 1024) closeSidebar();
                  }}
                >
                  <span>{gateway.name}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Support
            </h3>
            <nav className="mt-2 space-y-1">
              {support.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                  onClick={(e) => {
                    if (window.innerWidth < 1024) closeSidebar();
                  }}
                >
                  <item.icon className={cn("h-5 w-5", direction === "rtl" ? "ml-3" : "mr-3")} />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Sidebar for desktop */}
      <aside className={cn(
        "hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0",
        direction === "rtl" && "lg:right-0 lg:left-auto"
      )}>
        <div className="flex flex-col flex-1 min-h-0 bg-sidebar border-r border-sidebar-border">
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-white">{t('appName')}</h2>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                >
                  <item.icon className={cn("h-5 w-5", direction === "rtl" ? "ml-3" : "mr-3")} />
                  <span>{item.name}</span>
                </a>
              ))}
              
              <div className="pt-6">
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t('exploreGateways')}
                </h3>
                <nav className="mt-2 space-y-1">
                  {gateways.map((gateway) => (
                    <a
                      key={gateway.name}
                      href={gateway.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                    >
                      <span>{gateway.name}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6">
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Support
                </h3>
                <nav className="mt-2 space-y-1">
                  {support.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-sidebar-accent hover:text-white"
                    >
                      <item.icon className={cn("h-5 w-5", direction === "rtl" ? "ml-3" : "mr-3")} />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
