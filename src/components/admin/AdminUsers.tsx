
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Lock, Unlock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  kycStatus: string;
  createdAt: string;
  isActive: boolean;
}

// Mock data for demonstration
const mockUsers: UserData[] = [
  {
    id: "1",
    fullName: "أحمد محمد",
    email: "ahmed@example.com",
    roles: ["supplier"],
    kycStatus: "verified",
    createdAt: "2023-01-15",
    isActive: true
  },
  {
    id: "2",
    fullName: "سارة أحمد",
    email: "sara@example.com",
    roles: ["investor"],
    kycStatus: "in_review",
    createdAt: "2023-02-22",
    isActive: true
  },
  {
    id: "3",
    fullName: "محمد علي",
    email: "mohamed@example.com",
    roles: ["freelancer", "supplier"],
    kycStatus: "not_started",
    createdAt: "2023-03-10",
    isActive: false
  },
  {
    id: "4",
    fullName: "فاطمة حسن",
    email: "fatma@example.com",
    roles: ["admin"],
    kycStatus: "verified",
    createdAt: "2023-04-05",
    isActive: true
  }
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | undefined>();
  const [filterKyc, setFilterKyc] = useState<string | undefined>();

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    return (
      (searchQuery === "" || 
       user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterRole === undefined || user.roles.includes(filterRole)) &&
      (filterKyc === undefined || user.kycStatus === filterKyc)
    );
  });

  const getKycStatusClass = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
        <Button>إضافة مستخدم جديد</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن اسم أو بريد إلكتروني..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-40">
          <Select
            onValueChange={setFilterRole}
            value={filterRole}
          >
            <SelectTrigger>
              <SelectValue placeholder="فلترة بالدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier">مورد</SelectItem>
              <SelectItem value="investor">مستثمر</SelectItem>
              <SelectItem value="freelancer">مستقل</SelectItem>
              <SelectItem value="admin">مدير</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-40">
          <Select
            onValueChange={setFilterKyc}
            value={filterKyc}
          >
            <SelectTrigger>
              <SelectValue placeholder="حالة KYC" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verified">تم التحقق</SelectItem>
              <SelectItem value="in_review">قيد المراجعة</SelectItem>
              <SelectItem value="not_started">لم يبدأ</SelectItem>
              <SelectItem value="rejected">مرفوض</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableCaption>قائمة المستخدمين</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الأدوار</TableHead>
              <TableHead>حالة KYC</TableHead>
              <TableHead>تاريخ التسجيل</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className={!user.isActive ? "opacity-60" : ""}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles.map(role => (
                    <span key={role} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                      {role === 'supplier' ? 'مورد' : 
                       role === 'investor' ? 'مستثمر' : 
                       role === 'freelancer' ? 'مستقل' : 
                       role === 'admin' ? 'مدير' : role}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getKycStatusClass(user.kycStatus)}`}>
                    {user.kycStatus === 'verified' ? 'تم التحقق' : 
                     user.kycStatus === 'in_review' ? 'قيد المراجعة' : 
                     user.kycStatus === 'rejected' ? 'مرفوض' : 'لم يبدأ'}
                  </span>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.isActive ? 
                        <Lock className="h-4 w-4" /> : 
                        <Unlock className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
