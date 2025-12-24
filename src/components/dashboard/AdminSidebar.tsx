import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  UserCog,
  DollarSign,
  Settings,
  ChevronLeft,
  X,
  HelpCircle,
  Shield,
  Sparkles,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainMenuItems = [
  { title: "Tổng quan", url: "/admin", icon: LayoutDashboard },
  { title: "Quản lý Kho", url: "/admin/warehouses", icon: Package },
  { title: "Quản lý Đơn thuê", url: "/admin/bookings", icon: FileText },
  { title: "Quản lý Khách hàng", url: "/admin/customers", icon: Users },
  { title: "Quản lý Nhân viên", url: "/admin/staff", icon: UserCog },
  { title: "Báo cáo Doanh thu", url: "/admin/revenue", icon: DollarSign },
];

const generalMenuItems = [
  { title: "Trợ giúp", url: "/admin/help", icon: HelpCircle },
  { title: "Cài đặt", url: "/admin/settings", icon: Settings },
  { title: "Bảo mật", url: "/admin/security", icon: Shield },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const renderNavLink = (item: typeof mainMenuItems[0]) => (
    <NavLink
      key={item.title}
      to={item.url}
      end={item.url === "/admin"}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
        collapsed && "justify-center px-2"
      )}
      activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/10 hover:text-primary"
    >
      <item.icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.title}</span>}
    </NavLink>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen bg-card border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className={cn(
          "h-16 flex items-center border-b",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-bold text-lg text-primary">GenHub</span>
                <span className="text-xs text-muted-foreground block">Admin</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-8 w-8"
                onClick={() => setCollapsed(true)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden h-8 w-8"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-8"
              onClick={() => setCollapsed(false)}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}

        {/* Main Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Menu chính
            </p>
          )}
          {mainMenuItems.map(renderNavLink)}

          {!collapsed && <Separator className="my-4" />}
          {collapsed && <div className="my-2" />}

          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Chung
            </p>
          )}
          {generalMenuItems.map(renderNavLink)}
        </nav>

        {/* Promo Card */}
        {!collapsed && (
          <div className="p-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Nâng cấp Pro?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Mở khóa tính năng cao cấp với giảm giá 20%
              </p>
              <Button size="sm" className="w-full">
                Nâng cấp ngay
              </Button>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className={cn(
          "border-t p-3",
          collapsed ? "flex justify-center" : ""
        )}>
          <div className={cn(
            "flex items-center gap-3",
            collapsed ? "flex-col" : ""
          )}>
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">Quản trị viên</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
