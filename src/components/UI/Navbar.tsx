import { useMemo } from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface NavbarProps {
  collapsed: boolean;
  onShowSidebar: () => void;
  activePath: string;
}

const Navbar: React.FC<NavbarProps> = ({
  collapsed,
  onShowSidebar,
  activePath,
}) => {
  const titlePage = useMemo(
    () =>
      activePath !== ""
        ? activePath.charAt(0).toUpperCase() + activePath.slice(1)
        : "Dashboard",
    [activePath]
  );

  return (
    <>
      <>
        <Button
          type="text"
          icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={onShowSidebar}
          style={{
            fontSize: 16,
            width: 40,
            height: 40,
            margin: 10,
          }}
        />
        <span
          style={{
            fontSize: 18,
            fontWeight: "Bold",
          }}
        >
          {titlePage}
        </span>
      </>
    </>
  );
};

export default Navbar;
