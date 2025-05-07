
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArbitrationCase {
  id: string;
  title: string;
  parties: string[];
  createdAt: string;
  updatedAt: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  type: 'dispute' | 'mediation' | 'arbitration';
  priority: 'low' | 'medium' | 'high';
}

// Mock data for demonstration
const mockCases: ArbitrationCase[] = [
  {
    id: "ODR-2023-001",
    title: "نزاع بخصوص تسليم بضاعة متأخرة",
    parties: ["شركة الأمل", "شركة النور"],
    createdAt: "2023-05-10",
    updatedAt: "2023-05-15",
    status: "in_progress",
    type: "dispute",
    priority: "high"
  },
  {
    id: "ODR-2023-002",
    title: "خلاف على جودة المنتجات المستوردة",
    parties: ["مجموعة السلام", "شركة الريادة"],
    createdAt: "2023-06-20",
    updatedAt: "2023-06-25",
    status: "open",
    type: "arbitration",
    priority: "medium"
  },
  {
    id: "ODR-2023-003",
    title: "نزاع حول شروط التعاقد",
    parties: ["شركة المستقبل", "مؤسسة الإبداع"],
    createdAt: "2023-07-05",
    updatedAt: "2023-07-10",
    status: "resolved",
    type: "mediation",
    priority: "low"
  },
  {
    id: "ODR-2023-004",
    title: "تأخر في السداد لصفقة استيراد",
    parties: ["شركة الأمانة", "مجموعة البركة"],
    createdAt: "2023-08-12",
    updatedAt: "2023-08-18",
    status: "open",
    type: "dispute",
    priority: "high"
  }
];

const AdminArbitration: React.FC = () => {
  const [cases] = useState<ArbitrationCase[]>(mockCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [selectedCase, setSelectedCase] = useState<ArbitrationCase | null>(null);

  const filteredCases = cases.filter(case_ => {
    return (
      (searchQuery === "" || 
       case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       case_.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === undefined || case_.status === filterStatus)
    );
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  const handleViewCase = (case_: ArbitrationCase) => {
    setSelectedCase(case_);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة التحكيم الإلكتروني (ODR)</h2>
        <Button>إضافة قضية جديدة</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن قضية برقمها أو عنوانها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            onValueChange={setFilterStatus}
            value={filterStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="فلترة حسب الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">مفتوحة</SelectItem>
              <SelectItem value="in_progress">قيد المعالجة</SelectItem>
              <SelectItem value="resolved">تم الحل</SelectItem>
              <SelectItem value="closed">مغلقة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableCaption>قائمة قضايا التحكيم الإلكتروني</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">رقم القضية</TableHead>
              <TableHead>عنوان القضية</TableHead>
              <TableHead>الأطراف</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الأولوية</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell className="font-medium">{case_.id}</TableCell>
                <TableCell>{case_.title}</TableCell>
                <TableCell>{case_.parties.join(" & ")}</TableCell>
                <TableCell>{case_.createdAt}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(case_.status)}`}>
                    {case_.status === 'open' ? 'مفتوحة' : 
                     case_.status === 'in_progress' ? 'قيد المعالجة' : 
                     case_.status === 'resolved' ? 'تم الحل' : 'مغلقة'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(case_.priority)}`}>
                    {case_.priority === 'high' ? 'عالية' : 
                     case_.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => handleViewCase(case_)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>تفاصيل القضية: {case_.id}</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="details">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="details">التفاصيل</TabsTrigger>
                          <TabsTrigger value="documents">المستندات</TabsTrigger>
                          <TabsTrigger value="history">السجل</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4">
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <h3 className="font-semibold text-right col-span-1">العنوان:</h3>
                              <p className="col-span-3">{case_.title}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <h3 className="font-semibold text-right col-span-1">الأطراف:</h3>
                              <p className="col-span-3">{case_.parties.join(" و ")}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <h3 className="font-semibold text-right col-span-1">نوع القضية:</h3>
                              <p className="col-span-3">
                                {case_.type === 'dispute' ? 'نزاع' : 
                                 case_.type === 'mediation' ? 'وساطة' : 'تحكيم'}
                              </p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <h3 className="font-semibold text-right col-span-1">تاريخ الإنشاء:</h3>
                              <p className="col-span-3">{case_.createdAt}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <h3 className="font-semibold text-right col-span-1">آخر تحديث:</h3>
                              <p className="col-span-3">{case_.updatedAt}</p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button>تعيين محكم</Button>
                            <Button variant="outline">تحديث الحالة</Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="documents">
                          <p className="p-4 text-center text-muted-foreground">لا توجد مستندات متاحة</p>
                        </TabsContent>
                        <TabsContent value="history">
                          <p className="p-4 text-center text-muted-foreground">لا يوجد سجل متاح</p>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminArbitration;
