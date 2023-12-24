import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";

import { getFirstPathname } from "../utils/formatter";
import Sidebar from "../components/UI/Sidebar";
import Navbar from "../components/UI/Navbar";

export default function RootPage() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const activePath = useMemo(
    () => getFirstPathname(pathname) || "",
    [pathname]
  );

  const handleShowSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Layout style={{ margin: 0, minHeight: "100vh" }}>
      {/* Sidebar */}
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        theme="dark"
        width={180}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            padding: "14px 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            loading="lazy"
          />
        </Link>
        <Sidebar activePath={activePath} />
      </Layout.Sider>

      <Layout>
        {/* Navbar */}
        <Layout.Header
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <Navbar
            collapsed={collapsed}
            onShowSidebar={handleShowSidebar}
            activePath={activePath}
          />
        </Layout.Header>

        {/* Content */}
        <Layout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "white",
            borderRadius: 12,
          }}
        >
          <main>
            <Outlet />
          </main>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
