
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import AdminGroups from "@/components/admin/AdminGroups";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminArbitration from "@/components/admin/AdminArbitration";
import AdminUsers from "@/components/admin/AdminUsers";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const { user } = useAuth();

  // Check if user has admin role
  const isAdmin = user?.roles?.includes("admin");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
        </div>
        
        <Tabs defaultValue="groups" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="groups">المجموعات التجارية</TabsTrigger>
            <TabsTrigger value="payments">المدفوعات والفواتير</TabsTrigger>
            <TabsTrigger value="arbitration">التحكيم</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups">
            <AdminGroups />
          </TabsContent>
          
          <TabsContent value="payments">
            <AdminPayments />
          </TabsContent>
          
          <TabsContent value="arbitration">
            <AdminArbitration />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
