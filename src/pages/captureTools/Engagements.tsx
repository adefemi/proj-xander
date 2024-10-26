import { EngagementTable } from "@/components/common/engagementTable";
import { SearchBar } from "@/components/common/searchbar";
import useEngagement from "@/components/hooks/useEngagement";
import usePagination from "@/components/hooks/usePagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Engagement } from "@/utils/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkActionsDropdown = ({ onClick }: { onClick: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={onClick}>Delete Selected</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function PostEngagements() {
  const { engagements, deleteSelectedEngagements } = useEngagement();
  const [filteredEngagements, setFilteredEngagements] =
    useState<Engagement[]>(engagements);
  const navigate = useNavigate();
  const [selectedEngagements, setSelectedEngagements] = useState<number[]>([]);
  const { currentItems, getPagination } = usePagination<Engagement>({
    items: filteredEngagements,
  });

  const handleSelectAll = () => {
    if (selectedEngagements.length === currentItems.length) {
      setSelectedEngagements([]);
    } else {
      setSelectedEngagements(currentItems.map((engagement) => engagement.id));
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedEngagements.includes(id)) {
      setSelectedEngagements(
        selectedEngagements.filter((engagement) => engagement !== id),
      );
    } else {
      setSelectedEngagements([...selectedEngagements, id]);
    }
  };

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "delete":
        deleteSelectedEngagements([id]);
        break;

      case "edit":
        navigate(`/post-engagement/${id}/edit`);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setFilteredEngagements(engagements);
  }, [engagements]);

  const allSelected = selectedEngagements.length === currentItems.length;

  return (
    <div className="container mx-auto py-10 bg-white px-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Post Engagements</h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center mb-6">
        <SearchBar
          setFilteredItems={(newList) => setFilteredEngagements(newList)}
          engagements={engagements}
        />
        <BulkActionsDropdown
          onClick={() => deleteSelectedEngagements(selectedEngagements)}
        />
      </div>
      <EngagementTable
        engagements={[
          ...currentItems.map((engagement) => ({
            ...engagement,
            isSelected: selectedEngagements.includes(engagement.id),
          })),
        ]}
        handleAction={handleAction}
        handleSelectAll={handleSelectAll}
        handleSelectItem={handleSelectItem}
        allSelected={allSelected}
      />
      <div className="mt-6">{getPagination()}</div>
    </div>
  );
}
