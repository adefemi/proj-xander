import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { keyValue } from "@/utils/types";
import { FC, useState } from "react";

interface Props {
  data: keyValue;
  onSave: (data: keyValue) => void;
}

export const MessageFlowSelector: FC<Props> = ({ data, onSave }) => {
  const [messageFlow, setMessageFlow] = useState<keyValue>({
    messageType: "flow",
    flow: "flow1",
    ...data,
  });

  const handleChange = (key: string, value: string) => {
    const newData = { ...messageFlow, [key]: value };
    setMessageFlow(newData);
    onSave(newData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Flow</CardTitle>
        <CardDescription>Configure the response message flow</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message-type">Message Type</Label>
          <Select
            value={messageFlow.messageType as string}
            onValueChange={(value) => handleChange("messageType", value)}
          >
            <SelectTrigger id="message-type">
              <SelectValue placeholder="Select message type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flow">Dynamic Flow</SelectItem>
              <SelectItem value="static">Static Message</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="flow-select">Select Flow</Label>
          <Select
            value={messageFlow.flow as string}
            onValueChange={(value) => handleChange("flow", value)}
          >
            <SelectTrigger id="flow-select">
              <SelectValue placeholder="Select flow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flow1">Welcome Flow</SelectItem>
              <SelectItem value="flow2">Product Info Flow</SelectItem>
              <SelectItem value="flow3">Support Flow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
