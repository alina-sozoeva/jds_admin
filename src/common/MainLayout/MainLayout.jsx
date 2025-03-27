import { Layout } from "antd";
import { CustomSidebar } from "../CustomSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Layout.Sider
        width={190}
        collapsible
        collapsedWidth={60}
        trigger={null}
        theme="light"
        style={{
          position: "fixed",
          top: 0,
          width: 60,
          maxWidth: 60,
          bottom: 0,
          zIndex: 401,
          overflow: "auto",
          background: "white",
        }}
      >
        <CustomSidebar />
      </Layout.Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Layout.Content style={{ background: "white" }} className={"basic"}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
