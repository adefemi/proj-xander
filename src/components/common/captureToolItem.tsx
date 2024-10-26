import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Link,
  FileJson,
  CheckSquare,
  MessageSquare,
  BarChart2,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface CaptureToolItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const captureTools: CaptureToolItem[] = [
  { icon: Link, label: "Links Library", path: "#" },
  { icon: FileJson, label: "JSON Generator", path: "#" },
  { icon: CheckSquare, label: "Checkbox Plugin", path: "#" },
  { icon: MessageSquare, label: "Messenger Code", path: "#" },
  { icon: BarChart2, label: "Post Engagement", path: "/post-engagements" },
  { icon: Send, label: "Send To Messenger", path: "#" },
];

export default function CaptureToolsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Capture Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {captureTools.map((tool, index) => (
            <NavLink
              to={tool.path}
              key={index}
              className={cn(
                "flex items-center px-4 py-2 text-sm transition-colors hover:bg-gray-100",
                tool.path === location.pathname &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              <tool.icon className="mr-3 h-4 w-4" />
              {tool.label}
            </NavLink>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
