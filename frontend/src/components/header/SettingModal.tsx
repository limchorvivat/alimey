import React from "react";
import {
  Modal,
  Button,
  Slider,
  Typography,
  Row,
  Col,
  Card,
  Select,
} from "antd";
// import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface SettingsModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onOk,
  onCancel,
  colorScheme,
  setColorScheme,
  borderRadius,
  setBorderRadius,
  fontFamily,
  setFontFamily,
}) => {
  const colorSchemes = [
    { name: "Alimey", colors: ["#FF1D30", "#FF4D5A", "#E5E9F0"] },
    { name: "Atom One Dark", colors: ["#282c34", "#abb2bf", "#e06c75"] },
    { name: "Modern Dracula", colors: ["#282a36", "#f8f8f2", "#ff79c6"] },
    { name: "Nordic Frost", colors: ["#282a36", "#f8f8f2", "#ff79c6"] },
    { name: "Gruvbox", colors: ["#282828", "#ebdbb2", "#fb4934"] },
    { name: "Fluent Microsoft", colors: ["#0078d4", "#ffffff", "#e5e5e5"] },
    { name: "Flat Color", colors: ["#2c3e50", "#ecf0f1", "#e74c3c"] },
    { name: "Material Ocean", colors: ["#263238", "#80cbc4", "#ff5370"] },
    { name: "Solarized", colors: ["#002b36", "#839496", "#dc322f"] },
    { name: "Nord", colors: ["#2e3440", "#d8dee9", "#bf616a"] },
    { name: "Monokai Pro", colors: ["#2d2a2e", "#fcfcfa", "#ff6188"] },
    { name: "Pastel Dream", colors: ["#f4f1de", "#81b29a", "#e07a5f"] },
  ];

  const fontFamilies = [
    { label: "Poppins", value: "Poppins" },
    { label: "Work Sans", value: "Work Sans" },
    { label: "Montserrat", value: "Montserrat" },
    { label: "Roboto", value: "Roboto" },
    { label: "Khmer Os Muol Light", value: "Khmer Os Muol Light" },
    { label: "Khmer Os SiemReap", value: "Khmer Os SiemReap" },
    { label: "Battambang", value: "Battambang" }, // Popular Khmer font
    { label: "Kantumruy", value: "Kantumruy" }, // Popular Khmer font
    { label: "Moulpali", value: "Moulpali" }, // Popular Khmer font
    { label: "Preahvihear", value: "Preahvihear" }, // Popular Khmer font
    { label: "Ratanakiri", value: "Ratanakiri" }, // Popular Khmer font
    { label: "Trinigan Ann", value: "Trinigan Ann" }, // Popular Khmer font
    { label: "Arial", value: "Arial" }, // Common English font for fallbacks
    { label: "Verdana", value: "Verdana" }, // Common English font for fallbacks
    { label: "Tahoma", value: "Tahoma" }, // Common English font for fallbacks
    { label: "Times New Roman", value: "Times New Roman" },
  ];

  const { t } = useTranslation();

  return (
    <Modal
      title={t("Settings")}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>,
      ]}
      width={600}
      bodyStyle={{
        maxHeight: "60vh",
        overflowY: "auto",
        padding: "16px 24px",
      }}
    >
      <div>
        <Typography.Title level={4}>{t("Color Scheme")}</Typography.Title>
        <Row gutter={[16, 16]}>
          {colorSchemes.map((scheme) => (
            <Col key={scheme.name} span={12}>
              <Card
                hoverable
                onClick={() => setColorScheme(scheme.name)}
                style={{
                  border:
                    colorScheme === scheme.name
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "transform 0.1s, box-shadow 0.2s",
                  boxShadow:
                    colorScheme === scheme.name
                      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      overflow: "hidden",
                    }}
                  >
                    {scheme.colors.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: color,
                          height: 20,
                          flex: 1,
                          borderRadius: 4,
                        }}
                      />
                    ))}
                  </div>
                  <Typography.Text
                    strong
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {scheme.name}
                  </Typography.Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div style={{ marginTop: 24 }}>
        <Typography.Title level={4}>{t("Corner Radius")}</Typography.Title>
        <Slider
          min={0}
          max={16}
          value={borderRadius}
          onChange={(value) => setBorderRadius(value)}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <Typography.Title level={4}>{t("Font Family")}</Typography.Title>
        <Select
          showSearch
          style={{ width: "100%" }}
          value={fontFamily}
          onChange={(value) => setFontFamily(value)}
          options={fontFamilies}
          filterOption={(input, option) =>
            (option?.label as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </div>
      <div style={{ marginTop: 24 }}>
        {/* <Typography.Title level={4}>Language</Typography.Title> */}
        {/* <LanguageSwitcher /> */}
      </div>
    </Modal>
  );
};
