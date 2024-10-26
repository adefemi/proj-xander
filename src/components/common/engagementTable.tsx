import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Engagement } from "@/utils/types";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface EngagementTable extends Engagement {
  isSelected?: boolean;
}

interface Props {
  engagements: EngagementTable[];
  handleAction: (type: string, id: number) => void;
  handleSelectAll: () => void;
  handleSelectItem: (id: number) => void;
  allSelected: boolean;
}

export const EngagementTable: React.FC<Props> = ({
  engagements,
  handleAction,
  handleSelectAll,
  handleSelectItem,
  allSelected,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox onCheckedChange={handleSelectAll} checked={allSelected} />
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Engaged / Unique</TableHead>
        <TableHead>Acquired</TableHead>
        <TableHead>Conversion</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {engagements.map((engagement) => (
        <TableRow key={engagement.id}>
          <TableCell>
            <Checkbox
              onCheckedChange={() => handleSelectItem(engagement.id)}
              checked={engagement.isSelected}
            />
          </TableCell>
          <TableCell className="font-medium">
            <span className="flex items-center gap-4">
              {engagement.icon === "messenger" ? (
                <Instagram size={16} />
              ) : (
                <Facebook size={16} />
              )}
              {engagement.name}
            </span>
          </TableCell>
          <TableCell>
            {engagement.engaged} / {engagement.unique}
          </TableCell>
          <TableCell>{engagement.acquired}</TableCell>
          <TableCell>{engagement.conversion}%</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleAction("edit", engagement.id)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("delete", engagement.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
