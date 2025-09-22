import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu, Space } from "antd";
import styles from "./CustomSidebar.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import logo from "../../assets/logo_without_bg_blue.png";

const menuKeys = [
  {
    key: "2",
    label: "Отзывы",
    path: "/reviews",
  },
  {
    key: "3",
    label: "Обучение",
    path: "/edu",
  },
  {
    key: "4",
    label: "Баннеры",
    path: "/banners",
  },
];

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(() => {
    const currentMenuItem = menuKeys.find(
      (item) => item.path === location.pathname
    );
    return currentMenuItem ? currentMenuItem.key : null;
  }, [location.pathname]);

  const handleMenuClick = () => {
    localStorage.removeItem("filteredStatus");
  };

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Space>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={[selectedKey]}
          items={menuKeys.map(({ key, label, path }) => ({
            key,
            label: (
              <Link to={path} onClick={() => handleMenuClick()}>
                {label}
              </Link>
            ),
          }))}
          className={styles.menu}
        />
      </div>
      <Button
        type="primary"
        className={`${styles.logout}`}
        // onClick={() => logOut()}
      >
        <LogoutOutlined className={styles.out} /> Выход
      </Button>
    </div>
  );
};
