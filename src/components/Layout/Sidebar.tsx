
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutGrid, 
  Layers, 
  FileText, 
  FolderTree, 
  Image as ImageIcon,
  Settings, 
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SidebarItem = ({ to, icon: Icon, children }: SidebarItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn("sidebar-item", isActive && "active")
      }
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col z-20",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className={cn("flex items-center gap-2", !open && "justify-center w-full")}>
          <span className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">
            CM
          </span>
          {open && <span className="font-bold text-lg">Content Manager</span>}
        </div>
        {open && (
          <Button 
            onClick={onToggle}
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        <SidebarItem to="/dashboard" icon={LayoutGrid}>
          {open && "Dashboard"}
        </SidebarItem>
        <SidebarItem to="/categories" icon={FolderTree}>
          {open && "Categories"}
        </SidebarItem>
        <SidebarItem to="/content" icon={FileText}>
          {open && "Content"}
        </SidebarItem>
        <SidebarItem to="/pages" icon={Layers}>
          {open && "Pages"}
        </SidebarItem>
        <SidebarItem to="/media" icon={ImageIcon}>
          {open && "Media Library"}
        </SidebarItem>
        <SidebarItem to="/languages" icon={Globe}>
          {open && "Languages"}
        </SidebarItem>
      </div>
      
      <div className="p-4 border-t">
        <SidebarItem to="/settings" icon={Settings}>
          {open && "Settings"}
        </SidebarItem>
      </div>
    </aside>
  );
};
