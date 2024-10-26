import { InfoTooltip } from "@/components/common/InfoTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { KeywordFilters } from "./KeywordFilter";
import { MessageFlowSelector } from "./Messageflow";
import { basicType, keyValue } from "@/utils/types";

interface SettingsProps {
  data: keyValue;
  updateEdit: (data: keyValue) => void;
}

export const SettingsTab: FC<SettingsProps> = ({ data, updateEdit }) => {
  const [formState, setFormState] = useState({
    privateReply: false,
    oncePerPost: true,
    requireReaction: true,
    reactionType: "any",
    keywordFilters: {},
    messageFlow: {},
    ...data,
  });

  const handleChange = (key: string, value: basicType) => {
    setFormState({ ...formState, [key]: value });
  };

  useEffect(() => {
    updateEdit(formState);
  }, [formState]);

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Response Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="private-reply"
                className="flex items-center gap-2"
              >
                Private Reply to First-Level Comments
                <InfoTooltip content="Only reply to top-level comments privately" />
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Sends responses as private messages
              </p>
            </div>
            <Switch
              id="private-reply"
              checked={formState.privateReply}
              onCheckedChange={(checked) =>
                handleChange("privateReply", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="once-per-post"
                className="flex items-center gap-2"
              >
                One Response Per User
                <InfoTooltip content="Limit to one response per unique user on each post" />
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Prevents multiple responses to the same user
              </p>
            </div>
            <Switch
              id="once-per-post"
              checked={formState.oncePerPost}
              onCheckedChange={(checked) =>
                handleChange("oncePerPost", checked)
              }
            />
          </div>

          <div className="border-t pt-6">
            <Label className="flex items-center gap-2 mb-4">
              Reaction Requirements
              <InfoTooltip content="Set conditions for when to engage with posts" />
            </Label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Switch
                  id="require-reaction"
                  checked={formState.requireReaction}
                  onCheckedChange={(checked) =>
                    handleChange("requireReaction", checked)
                  }
                />
                <Label htmlFor="require-reaction">
                  Require post reaction before responding
                </Label>
              </div>
              {formState.requireReaction && (
                <Select
                  value={formState.reactionType}
                  onValueChange={(value) => handleChange("reactionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any reaction</SelectItem>
                    <SelectItem value="like">Like only</SelectItem>
                    <SelectItem value="love">Love only</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <KeywordFilters
        data={formState.keywordFilters}
        onSave={(data) => handleChange("keywordFilters", data)}
      />
      <MessageFlowSelector
        data={formState.messageFlow}
        onSave={(data) => handleChange("messageFlow", data)}
      />
    </div>
  );
};
