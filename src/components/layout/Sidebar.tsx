
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Home,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
  FileText,
  Scale,
  BookOpen
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Sidebar navigation component
 * 
 * Provides main navigation for the application
 */
const Sidebar = ({ isOpen, setIsOpen }) => {
  const { language, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [contractsOpen, setContractsOpen] = useState(true);
  const [governanceOpen, setGovernanceOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "ar" : "en");
  };

  // Classes for active and inactive navigation items
  const inactiveClass = "flex items-center p-2 hover:bg-sidebar-hover rounded-lg mb-1 text-gray-300 group duration-300";
  const activeClass = "flex items-center p-2 bg-sidebar-hover rounded-lg mb-1 text-primary group duration-300";
  
  // Function to determine if a path is active
  const isActive = (path: string) => location.pathname === path;
  
  // Sidebar item rendering function
  const renderSidebarItem = (
    path: string, 
    icon: React.ReactNode, 
    text: string
  ) => (
    <Link 
      to={path} 
      className={isActive(path) ? activeClass : inactiveClass}
      onClick={() => isMobile && setIsOpen(false)}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  );

  const sidebarClasses = isMobile 
    ? `fixed inset-y-0 left-0 z-50 w-48 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
    : 'fixed top-0 left-0 h-full w-48 bg-sidebar border-r border-sidebar-border pt-16';

  // If mobile and sidebar is open, add overlay
  const overlayClasses = isMobile && isOpen
    ? 'fixed inset-0 bg-black bg-opacity-50 z-40'
    : 'hidden';

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={overlayClasses} 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="h-full px-3 py-4 overflow-y-auto">          
          {/* Logo - only show on mobile */}
          {isMobile && (
            <div className="mb-5">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-semibold text-white">
                  Mirror DAO
                </span>
              </Link>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Main Navigation */}
            <div>
              <ul className="space-y-2">
                {renderSidebarItem("/", 
                  <Home className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "Home"
                )}
                
                {renderSidebarItem("/explore", 
                  <FileText className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "Explore Contracts"
                )}
                
                {/* Contracts Dropdown */}
                <li>
                  <button 
                    onClick={() => setContractsOpen(!contractsOpen)}
                    className="flex items-center w-full p-2 text-gray-300 hover:bg-sidebar-hover rounded-lg group"
                  >
                    <FileText className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                    <span className="flex-1 ml-3">Contracts</span>
                    {contractsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  {contractsOpen && (
                    <ul className="py-2 space-y-2 pl-6">
                      <li>
                        <Link 
                          to="/contracts/create" 
                          className={isActive("/contracts/create") ? activeClass : inactiveClass}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          Create Contract
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/kyc" 
                          className={isActive("/kyc") ? activeClass : inactiveClass}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          KYC Verification
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                
                {/* Governance Dropdown */}
                <li>
                  <button 
                    onClick={() => setGovernanceOpen(!governanceOpen)}
                    className="flex items-center w-full p-2 text-gray-300 hover:bg-sidebar-hover rounded-lg group"
                  >
                    <Users className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                    <span className="flex-1 ml-3">Governance</span>
                    {governanceOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  {governanceOpen && (
                    <ul className="py-2 space-y-2 pl-6">
                      <li>
                        <Link 
                          to="/proposals" 
                          className={isActive("/proposals") ? activeClass : inactiveClass}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          Proposals
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/voting" 
                          className={isActive("/voting") ? activeClass : inactiveClass}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          Voting
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                
                {/* Arbitration */}
                {renderSidebarItem("/arbitration", 
                  <Scale className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "Arbitration"
                )}
              </ul>
            </div>
            
            {/* Page Links */}
            <div>
              <div className="pt-4 mt-4 border-t border-sidebar-border">
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Pages
                </h5>
              </div>
              <ul className="space-y-2">
                {renderSidebarItem("/about", 
                  <BookOpen className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "About"
                )}
                
                {renderSidebarItem("/contact", 
                  <HelpCircle className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "Contact Us"
                )}
                
                {renderSidebarItem("/faq", 
                  <HelpCircle className="h-5 w-5 text-gray-300 group-hover:text-primary" />, 
                  "FAQs"
                )}
              </ul>
            </div>
            
            {/* User Actions */}
            <div className="pt-4 mt-4 border-t border-sidebar-border">
              <div className="flex items-center mb-2">
                <Button 
                  onClick={toggleTheme} 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-primary"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="ml-3">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </Button>
              </div>
              
              <div className="flex items-center mb-2">
                <Button 
                  onClick={toggleLanguage} 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-primary"
                >
                  <span className="h-5 w-5 flex items-center justify-center font-bold">
                    {language === "en" ? "ع" : "En"}
                  </span>
                  <span className="ml-3">
                    {language === "en" ? "العربية" : "English"}
                  </span>
                </Button>
              </div>
              
              {user && (
                <div className="flex items-center mb-2">
                  <Button 
                    onClick={() => signOut()} 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-primary"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-3">Log Out</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
