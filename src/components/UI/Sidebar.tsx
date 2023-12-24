import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaUserCircle, FaImages, FaNewspaper } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const MENU_ITEMS = [
  {
    key: "",
    icon: <IoHome />,
    label: "Dashboard",
  },
  {
    key: "posts",
    icon: <FaNewspaper />,
    label: "Posts",
  },
  {
    key: "albums",
    icon: <FaImages />,
    label: "Albums",
  },
  {
    key: "users",
    icon: <FaUserCircle />,
    label: "Users",
  },
];

interface SidebarProps {
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = memo(({ activePath }) => {
  const navigate = useNavigate();

  const handleChangeMenu = (e: { key: string }) => {
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      onClick={handleChangeMenu}
      theme="dark"
      mode="inline"
      items={MENU_ITEMS}
      defaultSelectedKeys={[activePath]}
    />
  );
});

export default Sidebar;
