
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface GroupData {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
}

// Mock data for demonstration
const mockGroups: GroupData[] = [
  {
    id: "1",
    name: "مجموعة المستوردين",
    description: "مجموعة تجارية للمستوردين من الشرق الأوسط",
    memberCount: 24,
    createdAt: "2023-05-10",
    status: "active"
  },
  {
    id: "2",
    name: "اتحاد المصدرين",
    description: "اتحاد المصدرين لتصدير المنتجات المحلية",
    memberCount: 18,
    createdAt: "2023-06-15",
    status: "active"
  },
  {
    id: "3",
    name: "مجموعة التجار المحليين",
    description: "مجموعة للتجار المحليين لتنسيق العمل المشترك",
    memberCount: 32,
    createdAt: "2023-07-20",
    status: "inactive"
  }
];

const AdminGroups: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>(mockGroups);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const { direction } = useLanguage();

  const handleCreateGroup = () => {
    const newGroupData: GroupData = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      memberCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setGroups([...groups, newGroupData]);
    setNewGroup({ name: '', description: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className={cn("flex justify-between items-center", direction === "rtl" ? "flex-row-reverse" : "")}>
        <h2 className="text-2xl font-bold text-primary">إدارة المجموعات التجارية</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/80">
              <Plus className="mr-2 h-4 w-4" />إنشاء مجموعة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-sidebar-border">
            <DialogHeader>
              <DialogTitle className="text-primary text-xl">إنشاء مجموعة جديدة</DialogTitle>
              <DialogDescription className="text-gray-300">
                أدخل تفاصيل المجموعة التجارية الجديدة.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={cn("text-right col-span-1", direction === "rtl" ? "text-right" : "text-left")}>
                  الاسم
                </Label>
                <Input 
                  id="name" 
                  value={newGroup.name} 
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="col-span-3 bg-sidebar-accent text-white" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className={cn("text-right col-span-1", direction === "rtl" ? "text-right" : "text-left")}>
                  الوصف
                </Label>
                <Input 
                  id="description" 
                  value={newGroup.description} 
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  className="col-span-3 bg-sidebar-accent text-white" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateGroup} className="bg-primary hover:bg-primary/80">إنشاء المجموعة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="bg-card border border-sidebar-border hover:border-primary/30 transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-primary">{group.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteGroup(group.id)}
                    className="hover:bg-red-500/20"
                  >
                    <Trash className="h-4 w-4 text-gray-300" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">
                تاريخ الإنشاء: {group.createdAt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{group.description}</p>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-400">عدد الأعضاء: {group.memberCount}</span>
                <span className={`px-2 py-1 rounded-full ${
                  group.status === 'active' 
                    ? 'bg-green-900/50 text-green-300' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {group.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary/20 border-sidebar-border hover:border-primary/50"
              >
                عرض التفاصيل
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGroups;
