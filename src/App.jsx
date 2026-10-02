import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import EditPage from "./pages/EditPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
