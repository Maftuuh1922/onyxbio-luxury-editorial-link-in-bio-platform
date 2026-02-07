import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
// Pages
import { HomePage } from '@/pages/HomePage';
import { AuthPage } from '@/pages/AuthPage';
import { PublicProfilePage } from '@/pages/PublicProfilePage';
import { DashboardOverview } from '@/pages/dashboard/DashboardOverview';
import { LinksEditor } from '@/pages/dashboard/LinksEditor';
import { AppearanceEditor } from '@/pages/dashboard/AppearanceEditor';
import { AnalyticsDashboard } from '@/pages/dashboard/AnalyticsDashboard';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
// Layouts
import { DashboardLayout } from '@/components/layout/DashboardLayout';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/login",
    element: <AuthPage mode="login" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/register",
    element: <AuthPage mode="register" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/forgot-password",
    element: <AuthPage mode="forgot-password" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/dashboard/overview" replace /> },
      { path: "overview", element: <DashboardOverview /> },
      { path: "links", element: <LinksEditor /> },
      { path: "appearance", element: <AppearanceEditor /> },
      { path: "analytics", element: <AnalyticsDashboard /> },
      { path: "settings", element: <SettingsPage /> },
    ]
  },
  {
    path: "/:username",
    element: <PublicProfilePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);