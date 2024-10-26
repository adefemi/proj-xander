import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Clock,
  Users,
  MessageSquare,
  Magnet,
  Volume2,
  Sparkles,
  Layers,
  LineChart,
  Settings,
} from "lucide-react";
interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Component({ className, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: Clock, label: "Schedule", path: "#" },
    { icon: Users, label: "Users", path: "#" },
    { icon: MessageSquare, label: "Messages", path: "#" },
    { icon: Magnet, label: "Highlights", path: "/" },
    { icon: Volume2, label: "Announcements", path: "#" },
    { icon: Sparkles, label: "Features", path: "#" },
    { icon: Layers, label: "Layers", path: "#" },
    { icon: LineChart, label: "Analytics", path: "#" },
    { icon: Settings, label: "Settings", path: "#" },
  ];

  return (
    <aside
      className={cn(
        "fixed z-20 transition-transform md:relative shadow-md md:shadow-none flex h-full w-16 flex-col items-center border-r bg-white py-4",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className,
      )}
      onClick={onClose}
    >
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={cn(
            "mb-2 flex h-12 w-12 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100",
            item.path === "/" &&
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          )}
          aria-label={item.label}
        >
          <item.icon className="h-6 w-6" />
        </NavLink>
      ))}
    </aside>
  );
}
