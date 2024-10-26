import CaptureToolsCard from "@/components/common/captureToolItem";
import { Route, Routes } from "react-router-dom";
import PostEngagements from "./captureTools/Engagements";

const CaptureTools = () => {
  return (
    <div className="h-full grid grid-cols-1 overflow-auto lg:grid-cols-[1fr_3fr] max-w-[1920px] mx-auto">
      <div className="p-6">
        <CaptureToolsCard />
      </div>
      <div className="p-6 md:overflow-auto">
        <Routes>
          <Route path="/post-engagements" element={<PostEngagements />} />
        </Routes>
      </div>
    </div>
  );
};

export default CaptureTools;
