import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keyValue } from "@/utils/types";
import { MessageSquare, X } from "lucide-react";
import { FC, useState } from "react";

interface KeywordManagerProps {
  type: "exclude" | "include";
  keywords: string[];
  onAdd: (keywords: string[]) => void;
  onRemove: (type: "exclude" | "include", index: number) => void;
}

const KeywordManager = ({
  type,
  keywords,
  onAdd,
  onRemove,
}: KeywordManagerProps) => {
  const [inputValue, setInputValue] = useState("");
  const isExclude = type === "exclude";

  const addKeyword = () => {
    if (inputValue.trim()) {
      onAdd([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ${
            isExclude ? "keyword to exclude" : "required keyword"
          }`}
        />
        <Button onClick={addKeyword}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className={`${
              isExclude
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            } px-3 py-1 rounded-full flex items-center text-sm`}
          >
            {keyword}
            <button onClick={() => onRemove(type, index)} className="ml-2">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

interface Props {
  data: keyValue;
  onSave: (data: keyValue) => void;
}

export const KeywordFilters: FC<Props> = ({ data, onSave }) => {
  const [keywords, setKeywords] = useState<keyValue>({
    exclude: [],
    include: [],
    ...data,
  });

  const [activeFilter, setActiveFilter] = useState("exclude");

  const updateKeywords = (data: keyValue) => {
    setKeywords({
      ...keywords,
      ...data,
    });
    onSave(data);
  };

  const removeKeyword = (type: string, index: number) => {
    const newKeywords = {
      ...keywords,
      [type]: (keywords[type] as string[]).filter(
        (_: string, i: number) => i !== index,
      ),
    };
    updateKeywords(newKeywords);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Keyword Filters
        </CardTitle>
        <CardDescription>Define keywords to filter comments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="exclude">Exclude Keywords</TabsTrigger>
            <TabsTrigger value="include">Required Keywords</TabsTrigger>
          </TabsList>
          <TabsContent value="exclude">
            <KeywordManager
              type="exclude"
              keywords={(keywords.exclude as string[]) || []}
              onAdd={(keywords) => updateKeywords({ exclude: keywords })}
              onRemove={removeKeyword}
            />
          </TabsContent>
          <TabsContent value="include">
            <KeywordManager
              type="include"
              keywords={(keywords.include as string[]) || []}
              onAdd={(keywords) => updateKeywords({ include: keywords })}
              onRemove={removeKeyword}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
