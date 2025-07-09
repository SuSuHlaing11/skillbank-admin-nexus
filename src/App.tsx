
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { AccountManagement } from "./components/management/AccountManagement";
import { PostManagement } from "./components/management/PostManagement";
import { GroupManagement } from "./components/management/GroupManagement";
import { VolunteerManagement } from "./components/management/VolunteerManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="posts" element={<PostManagement />} />
            <Route path="groups" element={<GroupManagement />} />
            <Route path="volunteers" element={<VolunteerManagement />} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings Coming Soon</h1></div>} />
          </Route>
          <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to VSB Admin</h1><p className="text-gray-600 mb-6">Volunteer Skill Bank Administration Portal</p><a href="/admin" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Go to Admin Dashboard</a></div></div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
