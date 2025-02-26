import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

export const DashboardLayout: React.FC = () => {
  return (
    // <Layout style={{ minHeight: "100vh" }}>
    //   <Sider>
    //     <div className="logo" />
    //     <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
    //       <Menu.Item key="1">
    //         <Link to="/dashboard">Dashboard</Link>
    //       </Menu.Item>
    //       <Menu.Item key="2">
    //         <Link to="/users">Users</Link>
    //       </Menu.Item>
    //     </Menu>
    //   </Sider>
    // <Layout>
    //   <Header style={{ textAlign: "center", background: "#fff", padding: 0 }}>
    //     <h1>Dashboard</h1>
    //   </Header>
    //   <Content style={{ margin: "16px" }}>
    //     <Outlet />
    //   </Content>
    //   <Footer style={{ textAlign: "center" }}>Dashboard ©2025</Footer>
    // </Layout>
    // // </Layout>
    <Header style={{ textAlign: "center", background: "#fff", padding: 0 }}>
      <h1>Dashboard</h1>
    </Header>
  );
};

export default DashboardLayout;
