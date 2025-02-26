import React, { useEffect, useState, useContext } from "react";
import { Typography, Space, theme } from "antd";
import { useGetIdentity } from "@refinedev/core";
import { ColorModeContext } from "../../contexts/color-mode";
import "./home.css";

const { Title, Text } = Typography;

const WelcomeScreen: React.FC = () => {
  const { token } = theme.useToken();
  const [greeting, setGreeting] = useState("");
  const { data: identity } = useGetIdentity<{
    id: number;
    name: string;
    email: string;
  }>();

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "Good Morning";
      if (hour >= 12 && hour < 17) return "Good Afternoon";
      if (hour >= 17 && hour < 22) return "Good Evening";
      return "Good Night";
    };
    setGreeting(getGreeting());
  }, []);

  return (
    <div
      className="welcome-container"
      style={{
        background: `linear-gradient(135deg, ${token.colorBgContainer} 0%, ${token.colorBgLayout} 100%)`,
        minHeight: "100vh",
        padding: "24px",
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="blur-circle"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `${token.colorPrimary}15`,
          filter: "blur(40px)",
          top: "25%",
          left: "25%",
          animation: "blob 7s infinite",
        }}
      />
      <div
        className="blur-circle"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `${token.colorSuccess}15`,
          filter: "blur(40px)",
          top: "33%",
          right: "25%",
          animation: "blob 7s infinite",
          animationDelay: "2s",
        }}
      />
      <div
        className="blur-circle"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `${token.colorWarning}15`,
          filter: "blur(40px)",
          bottom: "25%",
          left: "33%",
          animation: "blob 7s infinite",
          animationDelay: "4s",
        }}
      />

      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "350px",
            height: "250px",
            animation: "scaleIn 0.5s ease forwards",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <Title
          level={1}
          style={{
            margin: 0,
            color: token.colorText,
            animation: "slideUp 0.5s ease forwards",
          }}
        >
          Welcome to Alimey Express
        </Title>

        <Space direction="vertical" size="small">
          <Text
            style={{
              fontSize: 18,
              color: token.colorText,
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            {greeting}
            {identity?.name
              ? `, ${identity.name}`
              : ""}
          </Text>

          {identity?.email && (
            <Text
              type="secondary"
              style={{
                color: token.colorTextSecondary,
                animation: "fadeIn 0.5s ease forwards",
              }}
            >
              {identity.email}
            </Text>
          )}
        </Space>
      </div>
    </div>
  );
};

export default WelcomeScreen;
