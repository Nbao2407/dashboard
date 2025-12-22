import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Users, 
  Warehouse,
  ChevronLeft,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Orders", url: "/orders", icon: ClipboardList },
  { title: "Shipments", url: "/shipments", icon: Truck },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Suppliers", url: "/suppliers", icon: Users },
];

const bottomNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
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
        "fixed md:sticky top-0 left-0 z-50 h-screen bg-sidebar border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Warehouse className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg">WareFlow</span>
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
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </NavLink>
          ))}
          
          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full mt-2 hidden md:flex",
              collapsed ? "justify-center" : "justify-start"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )} />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
