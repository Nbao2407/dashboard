import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  MapPin,
  Globe,
  ChevronLeft,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Tổng quan", url: "/", icon: LayoutDashboard },
  { title: "Kho", url: "/warehouse", icon: Package },
  { title: "Hợp đồng", url: "/contracts", icon: FileText },
  { title: "Khách hàng", url: "/customers", icon: Users },
];

const regionItems = [
  { title: "Bản đồ kho", url: "/warehouse-map", icon: MapPin },
  { title: "Vùng địa lý", url: "/regions", icon: Globe },
];

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen bg-card border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg text-primary">GenHub</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Menu Section */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Menu
              </p>
            )}
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === "/"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/10 hover:text-primary"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>

          {/* Region Section */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Khu vực
              </p>
            )}
            {regionItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/10 hover:text-primary"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full hidden md:flex",
              collapsed ? "justify-center" : "justify-start"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )} />
            {!collapsed && <span className="ml-2">Thu gọn</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
