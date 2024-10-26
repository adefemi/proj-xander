import { InfoTooltip } from "@/components/common/InfoTooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { keyValue } from "@/utils/types";
import { MessageSquare, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface Props {
  data: keyValue;
  updateEdit: (data: keyValue) => void;
}

export const AutoResponseTab: FC<Props> = ({ data, updateEdit }) => {
  const [_data, setData] = useState({
    autoResponses: [
      { text: "Thank you for your comment! 🙌", active: true },
      { text: "We appreciate your feedback! 👍", active: true },
      { text: "Thanks for sharing your thoughts! 💭", active: true },
    ] as keyValue[],
    autoLikeComments: false,
    ...data,
  });

  const addResponse = () => {
    setData({
      ..._data,
      autoResponses: [..._data.autoResponses, { text: "", active: true }],
    });
  };

  useEffect(() => {
    updateEdit(_data);
  }, [_data]);

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Auto Response Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label htmlFor="auto-like" className="flex items-center gap-2">
                Auto-Like Comments
                <InfoTooltip content="Automatically like comments before responding" />
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                Engage with comments by liking them
              </p>
            </div>
            <Switch
              id="auto-like"
              checked={data.autoLikeComments as boolean}
              onCheckedChange={(checked) =>
                setData({ ..._data, autoLikeComments: checked })
              }
            />
          </div>

          <div className="border-t pt-6">
            <Label className="mb-4 flex items-center gap-2">
              Response Templates
              <InfoTooltip content="Add multiple response variations for more natural engagement" />
            </Label>
            <div className="space-y-4">
              {((data.autoResponses as keyValue[]) || []).map(
                (response, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Switch
                      checked={response.active as boolean}
                      onCheckedChange={(checked) => {
                        const newResponses = [
                          ...(data.autoResponses as keyValue[]),
                        ];
                        newResponses[index].active = checked;
                        setData({ ..._data, autoResponses: newResponses });
                      }}
                    />
                    <Input
                      value={response.text as string}
                      onChange={(e) => {
                        const newResponses = [
                          ...(data.autoResponses as keyValue[]),
                        ];
                        newResponses[index].text = e.target.value;
                        setData({ ..._data, autoResponses: newResponses });
                      }}
                      placeholder="Enter response template"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setData({
                          ..._data,
                          autoResponses: [
                            ..._data.autoResponses.slice(0, index),
                            ..._data.autoResponses.slice(index + 1),
                          ],
                        })
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ),
              )}
              <Button onClick={addResponse} className="w-full">
                Add Response Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
