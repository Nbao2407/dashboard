import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Search,
  CalendarCheck,
  FileText,
  Receipt,
  HeadphonesIcon,
  X,
  ChevronLeft,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/customer",
  },
  {
    title: "Hồ sơ cá nhân",
    icon: User,
    href: "/customer/profile",
  },
  {
    title: "Tìm kiếm kho",
    icon: Search,
    href: "/customer/search",
  },
  {
    title: "Đơn thuê của tôi",
    icon: CalendarCheck,
    href: "/customer/bookings",
  },
  {
    title: "Hợp đồng của tôi",
    icon: FileText,
    href: "/customer/contracts",
  },
  {
    title: "Hóa đơn & Thanh toán",
    icon: Receipt,
    href: "/customer/invoices",
  },
  {
    title: "Yêu cầu hỗ trợ",
    icon: HeadphonesIcon,
    href: "/customer/support",
  },
];

export function CustomerSidebar({ isOpen, onClose }: CustomerSidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!collapsed && (
            <Link to="/customer" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <Warehouse className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">KhoThuê</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
