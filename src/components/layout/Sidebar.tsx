
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
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
  VoteIcon,
  BarChart,
  UserCircle,
  BookOpen
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useMobile } from "@/hooks/use-mobile";

/**
 * Sidebar navigation component
 * 
 * Provides main navigation for the application
 */
const Sidebar = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMobile();
  const [expanded, setExpanded] = useState(false);
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
    >
      {icon}
      <span
        className={`ml-3 ${isMobile && !expanded ? "hidden" : ""}`}
      >
        {text}
      </span>
    </Link>
  );

  return (
    <aside className="h-screen sticky top-0 overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground w-64 md:w-auto transition-all duration-300">
      <div className={`h-full px-3 py-4 ${isMobile && !expanded ? "w-16" : "w-64"}`}>
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="w-full flex justify-end mb-5"
          >
            <ArrowRight className={`h-5 w-5 text-gray-300 transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
        
        {/* Logo */}
        <div className="mb-5">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            {(!isMobile || expanded) && (
              <span className="ml-3 text-xl font-semibold text-white">
                Mirror DAO
              </span>
            )}
          </Link>
        </div>
        
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
                  {(!isMobile || expanded) && (
                    <>
                      <span className="flex-1 ml-3">Contracts</span>
                      {contractsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
                
                {contractsOpen && (!isMobile || expanded) && (
                  <ul className="py-2 space-y-2 pl-6">
                    <li>
                      <Link 
                        to="/contracts/create" 
                        className={isActive("/contracts/create") ? activeClass : inactiveClass}
                      >
                        Create Contract
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/kyc" 
                        className={isActive("/kyc") ? activeClass : inactiveClass}
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
                  {(!isMobile || expanded) && (
                    <>
                      <span className="flex-1 ml-3">Governance</span>
                      {governanceOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
                
                {governanceOpen && (!isMobile || expanded) && (
                  <ul className="py-2 space-y-2 pl-6">
                    <li>
                      <Link 
                        to="/proposals" 
                        className={isActive("/proposals") ? activeClass : inactiveClass}
                      >
                        Proposals
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/voting" 
                        className={isActive("/voting") ? activeClass : inactiveClass}
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
            <div className={`pt-4 mt-4 border-t border-sidebar-border ${isMobile && !expanded ? "hidden" : ""}`}>
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
          <div className={`pt-4 mt-4 border-t border-sidebar-border ${isMobile && !expanded ? "hidden" : ""}`}>
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
            
            {isAuthenticated && (
              <div className="flex items-center mb-2">
                <Button 
                  onClick={() => logout()} 
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
  );
};

export default Sidebar;
