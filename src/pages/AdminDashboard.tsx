
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
      <div className={cn("space-y-6", direction === "rtl" ? "text-right" : "text-left")}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
        </div>
        
        <Tabs 
          defaultValue="groups" 
          value={activeTab} 
          onValueChange={setActiveTab}
          dir={direction}
          className="w-full"
        >
          <TabsList className={cn("w-full md:w-auto", direction === "rtl" ? "flex-row-reverse" : "")}>
            <TabsTrigger value="groups">المجموعات التجارية</TabsTrigger>
            <TabsTrigger value="payments">المدفوعات والفواتير</TabsTrigger>
            <TabsTrigger value="arbitration">التحكيم</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups" className="mt-6">
            <AdminGroups />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6">
            <AdminPayments />
          </TabsContent>
          
          <TabsContent value="arbitration" className="mt-6">
            <AdminArbitration />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
