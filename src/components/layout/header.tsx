import { Shield, Moon, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

export default function Header({ toggleSidebar, isOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b h-[64px]">
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden mr-4"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="flex flex-col">
          <span className="font-bold text-lg">hitunez</span>
          <span className="text-sm text-gray-500">@hitunezofficial</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" aria-label="Security">
          <Shield className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Moon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="User account">
          <User className="w-5 h-5" />
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
