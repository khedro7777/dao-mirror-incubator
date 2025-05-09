
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import AdminGroups from "@/components/admin/AdminGroups";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminArbitration from "@/components/admin/AdminArbitration";
import AdminUsers from "@/components/admin/AdminUsers";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const { user } = useAuth();
  const { direction } = useLanguage();

  // Check if user has admin role
  const isAdmin = user?.roles?.includes("admin");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className={cn("space-y-8", direction === "rtl" ? "text-right" : "text-left")}>
        <div className="flex items-center justify-between bg-card rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold text-primary">لوحة التحكم</h1>
        </div>
        
        <Tabs 
          defaultValue="groups" 
          value={activeTab} 
          onValueChange={setActiveTab}
          dir={direction}
          className="w-full"
        >
          <TabsList className={cn("w-full md:w-auto rounded-lg p-1 bg-card/80 backdrop-blur-sm", 
            direction === "rtl" ? "flex-row-reverse" : ""
          )}>
            <TabsTrigger 
              value="groups" 
              className={cn("data-[state=active]:bg-primary data-[state=active]:text-white rounded-md", 
                direction === "rtl" ? "ms-1" : "me-1"
              )}
            >
              المجموعات التجارية
            </TabsTrigger>
            <TabsTrigger 
              value="payments"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md mx-1"
            >
              المدفوعات والفواتير
            </TabsTrigger>
            <TabsTrigger 
              value="arbitration"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md mx-1"
            >
              التحكيم
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md mx-1"
            >
              المستخدمين
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups" className="mt-8 bg-card/30 rounded-lg p-6 shadow-sm">
            <AdminGroups />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-8 bg-card/30 rounded-lg p-6 shadow-sm">
            <AdminPayments />
          </TabsContent>
          
          <TabsContent value="arbitration" className="mt-8 bg-card/30 rounded-lg p-6 shadow-sm">
            <AdminArbitration />
          </TabsContent>
          
          <TabsContent value="users" className="mt-8 bg-card/30 rounded-lg p-6 shadow-sm">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
