
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
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المدفوعات والفواتير</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          تصدير البيانات
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن عميل أو رقم فاتورة..."
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
              <SelectItem value="paid">مدفوعة</SelectItem>
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="failed">فشلت</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableCaption>قائمة المدفوعات والفواتير</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">رقم الفاتورة</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>بوابة الدفع</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
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
