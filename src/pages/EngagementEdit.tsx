import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ChevronRight,
  Link,
  MessageSquare,
  Save,
  Settings2,
} from "lucide-react";
import { SettingsTab } from "./engagementEdits/Settings";
import { AutoResponseTab } from "./engagementEdits/AutoResponse";
import { SelectPostTab } from "./engagementEdits/SelectPost";
import { useParams } from "react-router-dom";
import useEngagement from "@/components/hooks/useEngagement";
import { useState } from "react";
import { keyValue } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import {Link as Li, useNavigate} from "react-router-dom";

const BreadcrumbNav = () => (
  <nav className="flex items-center space-x-1 text-sm text-gray-500">
    <Li to="/post-engagements">
    <Button variant="ghost" size="sm" className="gap-2">
      <ArrowLeft className="h-4 w-4" />
      Back to Engagements
    </Button>
    </Li>
    <ChevronRight className="h-4 w-4" />
    <span className="font-medium text-gray-900">Edit Post Engagement</span>
  </nav>
);

export default function PostEngagementEdit() {
  const { postId } = useParams();
  const { getEngagementById, _updateMetaInfo } = useEngagement();
  const activeEngagement = getEngagementById(Number(postId));
  const navigate = useNavigate();

  const [metaInfo, setMetaInfo] = useState<keyValue>(
    activeEngagement?.metaInfo || {},
  );

  const updateMetaInfo = (key: string, data: keyValue | keyValue[]) => {
    setMetaInfo({
      ...metaInfo,
      [key]: data,
    });
  };

  const handleSubmit = () => {
    _updateMetaInfo(metaInfo, Number(postId));
    toast({
      title: "Engagement Updated",
      description: "Your engagement has been updated.",
      variant: "default",
    })
    navigate("/post-engagements")
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-6">
        <BreadcrumbNav />
        <Button className="gap-2" onClick={handleSubmit}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-3xl">
          <TabsTrigger value="settings" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="auto-response" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Auto Response
          </TabsTrigger>
          <TabsTrigger value="select-post" className="gap-2">
            <Link className="h-4 w-4" />
            Select Post
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SettingsTab
            data={metaInfo.settings as keyValue || {}}
            updateEdit={(data) => updateMetaInfo("settings", data)}
          />
        </TabsContent>
        <TabsContent value="auto-response">
          <AutoResponseTab
            data={metaInfo.autoResponse as keyValue || {}}
            updateEdit={(data) => updateMetaInfo("autoResponse", data)}
          />
        </TabsContent>
        <TabsContent value="select-post">
          <SelectPostTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
