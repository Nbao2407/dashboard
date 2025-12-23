import { Bell, Search, Menu, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Greeting */}
          <div className="hidden sm:block">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              Hello Evano
              <span className="text-2xl">👋</span>
            </h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search here" 
              className="w-full pl-10 bg-card border-border rounded-xl"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Mail className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <Button className="gap-2 bg-primary hover:bg-primary-light text-primary-foreground rounded-xl ml-2">
            <span>Add New Product</span>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
