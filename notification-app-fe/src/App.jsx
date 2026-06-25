import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ViewedProvider } from "./context/ViewedContext";
import { AllNotificationsPage } from "./pages/AllNotificationsPage";
import { PriorityInboxPage } from "./pages/PriorityInboxPage";

export default function App() {
  return (
    <BrowserRouter>
      <ViewedProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<AllNotificationsPage />} />
            <Route path="/priority" element={<PriorityInboxPage />} />
          </Routes>
        </Layout>
      </ViewedProvider>
    </BrowserRouter>
  );
}
