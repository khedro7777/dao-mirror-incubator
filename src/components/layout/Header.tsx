
import React, { useState } from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
}

const Header = ({ setIsSidebarOpen }: HeaderProps) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="bg-sidebar shadow-md border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-sidebar-accent lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden lg:flex lg:items-center lg:ml-6">
              <a 
                href="/"
                className="flex-shrink-0 text-xl font-bold text-white"
              >
                Mirror DAO
              </a>
            </div>
          </div>
          <div className="flex items-center">
            {/* Language Selector */}
            <div className="relative ml-3">
              <button
                type="button"
                className="flex items-center text-sm text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <span>EN</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {languageOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5">
                  <div 
                    className="py-1" 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="language-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-sidebar-accent hover:text-white"
                      role="menuitem"
                      onClick={() => setLanguageOpen(false)}
                    >
                      English
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-sidebar-accent hover:text-white"
                      role="menuitem"
                      onClick={() => setLanguageOpen(false)}
                    >
                      Spanish
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-sidebar-accent hover:text-white"
                      role="menuitem"
                      onClick={() => setLanguageOpen(false)}
                    >
                      French
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Notification bell */}
            <div className="relative ml-4">
              <button
                type="button"
                className="flex items-center text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5">
                  <div className="py-2 px-3 border-b border-sidebar-border">
                    <h3 className="text-sm font-medium text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-3 py-4 text-center text-sm text-gray-400">
                      No new notifications
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile dropdown */}
            <div className="relative ml-4">
              <button
                type="button"
                className="flex items-center text-sm rounded-full text-white focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
