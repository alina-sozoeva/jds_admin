import { Layout } from "antd";
import { CustomSidebar } from "../CustomSidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Layout.Sider
        width={200}
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
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
