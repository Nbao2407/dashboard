import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type ContractStatus = Database["public"]["Enums"]["contract_status"];

const statusLabels: Record<ContractStatus, string> = {
  PENDING: "Chờ duyệt",
  ACTIVE: "Đang hiệu lực",
  OVERDUE_LEVEL_1: "Quá hạn cấp 1",
  OVERDUE_LEVEL_2: "Quá hạn cấp 2",
  OVERDUE_LEVEL_3: "Quá hạn cấp 3",
  SEALED: "Đã niêm phong",
  LIQUIDATED: "Đã thanh lý",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
};

const statusVariants: Record<ContractStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "secondary",
  ACTIVE: "default",
  OVERDUE_LEVEL_1: "destructive",
  OVERDUE_LEVEL_2: "destructive",
  OVERDUE_LEVEL_3: "destructive",
  SEALED: "outline",
  LIQUIDATED: "outline",
  CANCELLED: "destructive",
  COMPLETED: "default",
};

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["rental_contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_contracts")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredContracts = contracts?.filter((contract) => {
    const matchesSearch =
      contract.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || contract.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Trang chủ</span>
            <span>/</span>
            <span className="text-foreground">Hợp đồng</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Quản lý hợp đồng</h1>
                <p className="text-sm text-muted-foreground">Quản lý tất cả hợp đồng thuê kho</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm hợp đồng
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm theo mã hoặc tên hợp đồng..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="PENDING">Chờ duyệt</SelectItem>
                <SelectItem value="ACTIVE">Đang hiệu lực</SelectItem>
                <SelectItem value="OVERDUE_LEVEL_1">Quá hạn cấp 1</SelectItem>
                <SelectItem value="OVERDUE_LEVEL_2">Quá hạn cấp 2</SelectItem>
                <SelectItem value="OVERDUE_LEVEL_3">Quá hạn cấp 3</SelectItem>
                <SelectItem value="SEALED">Đã niêm phong</SelectItem>
                <SelectItem value="LIQUIDATED">Đã thanh lý</SelectItem>
                <SelectItem value="CANCELLED">Đã hủy</SelectItem>
                <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Lọc
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã HĐ</TableHead>
                  <TableHead>Tên hợp đồng</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày hết hạn</TableHead>
                  <TableHead className="text-right">Tổng giá trị</TableHead>
                  <TableHead className="text-right">Giá sau CK</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Đang tải...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredContracts && filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.code}</TableCell>
                      <TableCell>{contract.name || "-"}</TableCell>
                      <TableCell>{formatDate(contract.started_at)}</TableCell>
                      <TableCell>{formatDate(contract.expired_at)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(contract.total_price)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(contract.final_price)}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[contract.status as ContractStatus]}>
                          {statusLabels[contract.status as ContractStatus]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Không tìm thấy hợp đồng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-muted-foreground">
                Hiển thị {filteredContracts?.length || 0} hợp đồng
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contracts;
