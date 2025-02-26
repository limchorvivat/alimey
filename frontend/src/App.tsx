import React from "react";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { ThemedSiderV2 } from "./components/layout/sider";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { useTranslation } from "react-i18next";

// Import your custom components
import Dashboard from "./pages/dashboard/Dashboard";
import { User2sList } from "./pages/user2s";
import { CargoCreate, CargoEdit, CargoList, CargoShow } from "./pages/cargo";
import { CarrierShow, CarrierEdit, CarrierList } from "./pages/carriers";
import { StaffList } from "./pages/manager/staff";
import { WorkOtsList } from "./pages/manager/OT";
import { Permission1List } from "./pages/manager/permission";
import LogoGreeting from "./components/logogreeting/LogoGreeting";
import { ServicesCreate, ServicesEdit, ServicesList, ServiceShow } from "./pages/service";
import Kanban from "./pages/taskmanager/Kanban";

// Import the i18n configuration
import "./i18n";

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              authProvider={authProvider}
              dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    label: t("Dashboard"),
                  },
                },
                {
                  name: "user2s",
                  list: "/user2s",
                  meta: {
                    parent: t("Customer"),
                    label: t("Customer_Information"),
                    canDelete: true,
                  },
                },
                {
                  name: "services",
                  list: "/services",
                  meta: {
                    parent: t("Customer"),
                    label: t("Service_Information"),
                    canDelete: true,
                  },
                },
                {
                  name: "cargos",
                  list: "/cargos",
                  create: "/cargos/create",
                  edit: "/cargos/edit/:id",
                  show: "/cargos/show/:id",
                  meta: {
                    label: t("Cargo"),
                    canDelete: true,
                  },
                },
                {
                  name: "carriers",
                  list: "/carriers",
                  edit: "/carriers/edit/:id",
                  show: "/carriers/show/:id",
                  meta: {
                    label: t("Carriers"),
                    canDelete: true,
                  },
                },
                {
                  name: "staff",
                  list: "/staff",
                  meta: {
                    label: t("Staff"),
                    canDelete: true,
                    parent: t("Manager"),
                  },
                },
                {
                  name: "work-ots",
                  list: "/work_ots",
                  meta: {
                    label: t("OT"),
                    canDelete: true,
                    parent: t("Manager"),
                  },
                },
                {
                  name: "permission1",
                  list: "/permission1",
                  edit: "/permission1/edit/:id",
                  show: "/permission1/show/:id",
                  meta: {
                    label: t("Permissions"),
                    canDelete: true,
                    parent: t("Manager"),
                  },
                },
                // Add the tasks resource for the Kanban board
                {
                  name: "task-managements",
                  list: "/task-managements",
                  meta: {
                    label: t("Task Management"),
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "sm5oOD-2zdbun-jU4Y5X",
                title: {
                  text: "AlimeyExpress",
                  icon: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ width: "70px", height: "45px" }}
                        src="logo.png"
                        alt="logo"
                      />
                    </div>
                  ),
                },
              }}
            >
              <Routes>
                {/* Authenticated Routes */}
                <Route
                  element={
                    <Authenticated
                      key="authenticated"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={Header}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<LogoGreeting />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/services">
                    <Route index element={<ServicesList />} />
                    {/* <Route path="create" element={<ServicesCreate />} /> */}
                    {/* <Route path="edit/:id" element={<ServicesEdit />} />
                    <Route path="show/:id" element={<ServiceShow />} /> */}
                  </Route>
                  <Route path="/user2s">
                    <Route index element={<User2sList />} />
                  </Route>
                  <Route path="/cargos">
                    <Route index element={<CargoList />} />
                    <Route path="create" element={<CargoCreate />} />
                    <Route path="edit/:id" element={<CargoEdit />} />
                    <Route path="show/:id" element={<CargoShow />} />
                  </Route>
                  <Route path="/carriers">
                    <Route index element={<CarrierList />} />
                    <Route path="edit/:id" element={<CarrierEdit />} />
                    <Route path="show/:id" element={<CarrierShow />} />
                  </Route>
                  <Route path="/staff">
                    <Route index element={<StaffList />} />
                  </Route>
                  <Route path="/work_ots">
                    <Route index element={<WorkOtsList />} />
                  </Route>
                  <Route path="/permission1">
                    <Route index element={<Permission1List />} />
                  </Route>
                  {/* Add the Kanban route for tasks */}
                  <Route path="/task-managements" element={<Kanban />} />
                </Route>

                {/* Authentication Routes */}
                <Route
                  element={
                    <Authenticated
                      key="authenticated-login"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<AuthPage type="login" />} />
                  <Route path="/register" element={<AuthPage type="register" />} />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<ErrorComponent />} />
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </Router>
  );
}

export default App;