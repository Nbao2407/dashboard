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
  X,
  HelpCircle,
  Settings,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/warehouse", icon: Package },
  { title: "Shipment", url: "/contracts", icon: FileText },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Store", url: "/warehouse-map", icon: MapPin },
  { title: "Report", url: "/regions", icon: Globe },
];

const generalItems = [
  { title: "Help", url: "#", icon: HelpCircle },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Privacy", url: "#", icon: ShieldCheck },
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
        "fixed md:sticky top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300 sidebar-gradient",
        collapsed ? "w-16" : "w-60",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg text-white">vault</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Menu Section */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="text-xs font-semibold text-sidebar-muted uppercase tracking-wider px-3 mb-3">
                Menu
              </p>
            )}
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === "/"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-white transition-colors",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>

          {/* General Section */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="text-xs font-semibold text-sidebar-muted uppercase tracking-wider px-3 mb-3">
                General
              </p>
            )}
            {generalItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-white transition-colors",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Pro Card */}
        {!collapsed && (
          <div className="mx-4 mb-4 p-4 rounded-xl bg-sidebar-accent border border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-sidebar-primary/20">
                <Sparkles className="h-4 w-4 text-sidebar-primary" />
              </div>
              <span className="font-semibold text-white text-sm">Look For Pro ?</span>
            </div>
            <p className="text-xs text-sidebar-foreground mb-3">
              Unlock premium features with 20% off – for a limited time!
            </p>
            <Button 
              size="sm" 
              className="w-full bg-white text-primary hover:bg-white/90 font-medium"
            >
              Upgrade Now
            </Button>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shrink-0">
              E
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">Evano</p>
                <p className="text-xs text-sidebar-muted truncate">Sales Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Button (when collapsed) */}
        {collapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
              onClick={() => setCollapsed(false)}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
