
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
import { Search, Filter, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface PaymentData {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  gateway: 'PayPal' | 'Fawry' | 'InstaPay' | 'Stripe';
}

// Mock data for demonstration
const mockPayments: PaymentData[] = [
  {
    id: "1",
    invoiceNumber: "INV-2023-001",
    customer: "شركة الأمل للتجارة",
    amount: 5000,
    currency: "USD",
    status: "paid",
    date: "2023-05-15",
    gateway: "PayPal"
  },
  {
    id: "2",
    invoiceNumber: "INV-2023-002",
    customer: "مجموعة السلام للاستيراد",
    amount: 7500,
    currency: "USD",
    status: "pending",
    date: "2023-06-22",
    gateway: "Fawry"
  },
  {
    id: "3",
    invoiceNumber: "INV-2023-003",
    customer: "شركة النور للتصدير",
    amount: 3200,
    currency: "USD",
    status: "failed",
    date: "2023-07-30",
    gateway: "InstaPay"
  },
  {
    id: "4",
    invoiceNumber: "INV-2023-004",
    customer: "مجموعة الريادة التجارية",
    amount: 9800,
    currency: "USD",
    status: "paid",
    date: "2023-08-05",
    gateway: "Stripe"
  }
];

const AdminPayments: React.FC = () => {
  const [payments] = useState<PaymentData[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const { direction } = useLanguage();

  const filteredPayments = payments.filter(payment => {
    return (
      (searchQuery === "" || 
       payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
       payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === undefined || payment.status === filterStatus)
    );
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-900/50 text-green-300';
      case 'pending':
        return 'bg-amber-900/50 text-amber-300';
      case 'failed':
        return 'bg-red-900/50 text-red-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className={cn("flex justify-between items-center", direction === "rtl" ? "flex-row-reverse" : "")}>
        <h2 className="text-2xl font-bold text-primary">إدارة المدفوعات والفواتير</h2>
        <Button variant="outline" className="border-sidebar-border hover:bg-primary/20 hover:border-primary/50">
          <Download className="mr-2 h-4 w-4" />
          تصدير البيانات
        </Button>
      </div>

      <div className={cn("flex flex-col md:flex-row gap-4", direction === "rtl" ? "md:flex-row-reverse" : "")}>
        <div className="relative flex-1">
          <Search className={cn("absolute top-3 h-4 w-4 text-muted-foreground", 
            direction === "rtl" ? "right-3" : "left-3"
          )} />
          <Input
            placeholder="البحث عن عميل أو رقم فاتورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("bg-sidebar-accent text-white border-sidebar-border", 
              direction === "rtl" ? "pr-10" : "pl-10"
            )}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            onValueChange={setFilterStatus}
            value={filterStatus}
          >
            <SelectTrigger className="bg-sidebar-accent text-white border-sidebar-border">
              <SelectValue placeholder="فلترة حسب الحالة" />
            </SelectTrigger>
            <SelectContent className="bg-card border-sidebar-border">
              <SelectItem value="paid">مدفوعة</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="failed">فشلت</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-sidebar-border overflow-hidden bg-card/50">
        <Table>
          <TableCaption>قائمة المدفوعات والفواتير</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-primary/5 border-sidebar-border">
              <TableHead className="w-[150px] text-primary">رقم الفاتورة</TableHead>
              <TableHead className="text-primary">العميل</TableHead>
              <TableHead className="text-primary">المبلغ</TableHead>
              <TableHead className="text-primary">بوابة الدفع</TableHead>
              <TableHead className="text-primary">التاريخ</TableHead>
              <TableHead className="text-primary">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-primary/5 border-sidebar-border">
                <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.amount} {payment.currency}</TableCell>
                <TableCell>{payment.gateway}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(payment.status)}`}>
                    {payment.status === 'paid' ? 'مدفوعة' : 
                     payment.status === 'pending' ? 'قيد الانتظار' : 'فشلت'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPayments;
