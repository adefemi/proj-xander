import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "./components/layout/mainLayout";
import CaptureTools from "./pages/CaptureTools";
import PostEngagementEdit from "./pages/EngagementEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/post-engagement/:postId/edit"
            element={<PostEngagementEdit />}
          />
          <Route path="/*" element={<CaptureTools />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
