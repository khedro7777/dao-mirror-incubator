import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Search,
  Vote,
  ClipboardList,
  Scale,
  Settings,
  HelpCircle,
  LogOut,
  Languages,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const direction = currentLanguage === "ar" ? "rtl" : "ltr";

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out",
          !isOpen && "-translate-x-full",
          direction === "rtl" && "left-auto right-0",
          direction === "rtl" && !isOpen && "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold text-xl">Mirror DAO</span>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-4 py-2">
          {user ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  {t("role")}: {user.roles ? user.roles[0] : "N/A"}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <NavLink
                to="/login"
                className="block px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/80"
              >
                {t("login")}
              </NavLink>
            </div>
          )}
        </div>
        
        <div className="p-4 overflow-y-auto">
          <nav className="space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t("main")}
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                      )
                    }
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("dashboard")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                      )
                    }
                  >
                    <Search className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("explore")}
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    to="/voting"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                      )
                    }
                  >
                    <Vote className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("voting")}
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    to="/proposals"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                      )
                    }
                  >
                    <ClipboardList className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("proposals")}
                  </NavLink>
                </li>
                
                {/* New Arbitration Center Link */}
                <li>
                  <NavLink
                    to="/arbitration"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-sidebar-hover hover:text-white"
                      )
                    }
                  >
                    <Scale className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("arbitration")}
                  </NavLink>
                </li>
              </ul>
            </div>
            
            {/* Settings */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t("settings")}
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setTheme(theme === "light" ? "dark" : "light");
                    }}
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white"
                  >
                    {theme === "light" ? (
                      <Moon className="mr-3 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <Sun className="mr-3 h-5 w-5 flex-shrink-0" />
                    )}
                    {t(theme === "light" ? "darkMode" : "lightMode")}
                    <div className="ml-auto">
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={() => {
                          setTheme(theme === "light" ? "dark" : "light");
                        }}
                      />
                    </div>
                  </button>
                </li>
                <li>
                  <button className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white">
                    <Languages className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("language")}
                    <div className="ml-auto">
                      <select
                        className="bg-transparent border-none text-white focus:ring-0"
                        value={currentLanguage}
                        onChange={(e) => changeLanguage(e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>
                  </button>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white"
                  >
                    <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("accountSettings")}
                  </NavLink>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t("support")}
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/help"
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white"
                  >
                    <HelpCircle className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("helpCenter")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white"
                  >
                    <HelpCircle className="mr-3 h-5 w-5 flex-shrink-0" />
                    {t("contactUs")}
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center px-2 py-2 text-sm font-medium rounded-md group text-gray-300 hover:bg-sidebar-hover hover:text-white"
                    >
                      <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                      {t("signOut")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
