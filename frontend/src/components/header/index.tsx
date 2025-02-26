import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Button,
  theme,
  Modal,
  Typography,
  Divider,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { SettingsModal } from "./SettingModal"; // Import the SettingsModal component
import { useTranslation } from "react-i18next";
const { useToken } = theme;
const { Title, Text } = Typography;

type IUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
};

interface HeaderProps extends RefineThemedLayoutV2HeaderProps {
  title?: React.ComponentType<{ collapsed?: boolean }> | string;
}

const useAvatar = (userId: string | number | undefined) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const fetchAvatar = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:1337/api/users/${userId}?populate=avatar`
      );

      if (response.data && response.data.avatar && response.data.avatar.url) {
        const avatarUrl = `http://localhost:1337${response.data.avatar.url}`;
        setAvatar(avatarUrl);
      } else {
        console.error("Avatar data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchAvatar();
  }, [fetchAvatar]);

  return avatar;
};

export const Header: React.FC<HeaderProps> = ({
  sticky = true,
  isSticky,
  title: titleFromProps,
}) => {
  const { token } = useToken();
  const { data: user, refetch } = useGetIdentity<IUser>();
  const avatarUrl = useAvatar(user?.id);

  const {
    mode,
    setMode,
    colorScheme,
    setColorScheme,
    borderRadius,
    setBorderRadius,
    fontFamily,
    setFontFamily,
  } = useContext(ColorModeContext);

  const [language, setLanguage] = useState<"en" | "kh">("en"); // Language state
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const userWithAvatar = useMemo(() => {
    if (user && avatarUrl) {
      return { ...user, avatar: avatarUrl };
    }
    return user;
  }, [user, avatarUrl]);
  const { t } = useTranslation();
  const headerStyles: React.CSSProperties = {
    backgroundColor: `${token.colorBgElevated}50`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(38px)",
    WebkitBackdropFilter: "blur(38px)",
    borderBlockEnd: `1px solid ${token.colorBorder}`,
    position: "sticky",
    top: 0,
    // borderBottomLeftRadius: token.borderRadius,
    // borderBottomRightRadius: token.borderRadius,
    zIndex: 998,
    transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
    height: "64px",
  };

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const showSettingsModal = () => {
    setIsSettingsModalVisible(true);
  };

  const handleSettingsOk = () => {
    setIsSettingsModalVisible(false);
  };

  const handleSettingsCancel = () => {
    setIsSettingsModalVisible(false);
  };

  const openProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalVisible(false);
  };

  return (
    <>
      <AntdLayout.Header style={headerStyles}>
        <div style={{ flex: 1 }}></div>
        <Space size="middle" align="center">
          <LanguageSwitcher />
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            onClick={showSettingsModal}
          />
          <Button shape="circle" onClick={toggleTheme}>
            {mode === "light" ? "🌞" : "🌙"}
          </Button>
          {userWithAvatar?.name && (
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={openProfileModal}
            >
              {userWithAvatar.name}
            </span>
          )}
          {userWithAvatar?.avatar ? (
            <Avatar
              src={userWithAvatar.avatar}
              alt={userWithAvatar?.name}
              size={32}
              onClick={openProfileModal}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={32}
              onClick={openProfileModal}
              style={{ cursor: "pointer" }}
            />
          )}
        </Space>
      </AntdLayout.Header>

      <SettingsModal
        open={isSettingsModalVisible}
        onOk={handleSettingsOk}
        onCancel={handleSettingsCancel}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        // language={language} // Pass language state to SettingsModal
        // setLanguage={setLanguage} // Pass setLanguage function to SettingsModal
      />

      <Modal
        title={t("User Profile")}
        visible={isProfileModalVisible}
        onCancel={closeProfileModal}
        footer={null}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          {userWithAvatar?.avatar ? (
            <Avatar src={userWithAvatar.avatar} size={128} />
          ) : (
            <Avatar icon={<UserOutlined />} size={128} />
          )}
        </div>
        <Divider />
        <div style={{ marginBottom: 10 }}>
          <Title level={4}>{t("Name")}</Title>
          <Text>{userWithAvatar?.name}</Text>
        </div>
        <Divider />
        <div style={{ marginBottom: 10 }}>
          <Title level={4}>{t("Email")}</Title>
          <Text>{userWithAvatar?.email}</Text>
        </div>
        <Divider />
        <div>
          <Title level={4}>{t("Account Created")}</Title>
          <Text>
            {userWithAvatar?.createdAt
              ? new Date(userWithAvatar.createdAt).toLocaleString()
              : "N/A"}
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default Header;
