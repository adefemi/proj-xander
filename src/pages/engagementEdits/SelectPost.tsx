import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import { useState } from "react";

export const SelectPostTab = () => {
  const [postUrl, setPostUrl] = useState("");

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Select Target Post
          </CardTitle>
          <CardDescription>
            Choose the post to apply these engagement settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-url">Post URL or ID</Label>
            <div className="flex gap-2">
              <Input
                id="post-url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://example.com/posts/123 or POST_ID"
              />
              <Button>Fetch Post</Button>
            </div>
          </div>

          <Button className="w-full">Browse Posts</Button>
        </CardContent>
      </Card>
    </div>
  );
};
