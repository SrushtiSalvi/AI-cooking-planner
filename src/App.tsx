import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Planner from "@/pages/Planner";
import History from "@/pages/History";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
