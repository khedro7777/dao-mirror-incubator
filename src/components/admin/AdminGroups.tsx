
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المجموعات التجارية</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2" />إنشاء مجموعة جديدة</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل المجموعة التجارية الجديدة.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right col-span-1">
                  الاسم
                </Label>
                <Input 
                  id="name" 
                  value={newGroup.name} 
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right col-span-1">
                  الوصف
                </Label>
                <Input 
                  id="description" 
                  value={newGroup.description} 
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateGroup}>إنشاء المجموعة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{group.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                تاريخ الإنشاء: {group.createdAt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{group.description}</p>
              <div className="mt-4 flex justify-between text-sm">
                <span>عدد الأعضاء: {group.memberCount}</span>
                <span className={`px-2 py-1 rounded-full ${
                  group.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {group.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">عرض التفاصيل</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGroups;
