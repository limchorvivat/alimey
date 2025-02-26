import { ConfigProvider, theme } from "antd";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeConfig } from "antd";

// Extend the ComponentsConfig type to include Sider
declare module "antd/es/config-provider/context" {
  interface ComponentsConfig {
    Sider?: {
      colorBgCollapsedButton: string;
    };
  }
}
const { defaultAlgorithm, darkAlgorithm } = theme;

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

type ColorScheme = {
  light: ThemeConfig;
  dark: ThemeConfig;
};

type ColorSchemes = {
  [key: string]: ColorScheme;
};

const colorSchemes: ColorSchemes = {
  Alimey: {
    light: {
      token: {
        colorPrimary: "#FF4D5A", // Your signature red, vibrant and bold
        colorInfo: "#FF7080", // A softer red for informational elements
        colorSuccess: "#32CD32", // Bright green for success states
        colorWarning: "#FFC107", // Warm yellow for warnings
        colorError: "#FF4D5A", // Same as primary red for error states
        colorText: "#2E3440", // Dark text for contrast
        colorTextSecondary: "#5B626B", // Secondary text color
        colorBgBase: "#FFFFFF", // Clean white background
        colorBgContainer: "#F9FAFB", // Slightly off-white for containers
        colorBorder: "#E5E7EB", // Light gray border for subtle separation
        colorBorderSecondary: "#D1D5DB", // Secondary border color
        // Rounded corners for a modern look
        fontSize: 14,
        motion: true, // Enable smooth transitions
      },
      components: {
        Button: {
          colorPrimary: "#FF4D5A", // Signature red
          colorPrimaryHover: "#FF2D3F", // Darker red on hover
          colorPrimaryActive: "#FF1D30", // Even darker red on click

          boxShadow: "0 2px 4px rgba(255, 77, 90, 0.15)", // Subtle shadow for depth
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#E5E7EB",
          colorBgContainer: "#FFFFFF",
          hoverBorderColor: "#FF4D5A", // Signature red on hover
          activeBorderColor: "#FF2D3F", // Darker red when active
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#FFFFFF",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Soft shadow for cards
          colorBorder: "#E5E7EB",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#FFEBEE", // Light pinkish background on hover
          colorItemBgSelected: "#FFF0F2", // Light red tint for selected items
          colorItemTextSelected: "#FF4D5A", // Signature red for selected text

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#F9FAFB",
          headerColor: "#2E3440",
          rowHoverBg: "#FFEBEE", // Light red tint for hover
          borderColor: "#E5E7EB",
          headerBorderRadius: 8,
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.45)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          contentBg: "#FFFFFF",
          headerBg: "#FFFFFF",
          footerBg: "#FFFFFF",
        },
        Layout: {
          colorBgHeader: "#FFFFFF",
          colorBgBody: "#F9FAFB",
        },
        Divider: {
          colorSplit: "#E5E7EB",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#FF4D5A", // Your signature red, consistent in dark mode
        colorInfo: "#FF7080", // Softer red for information
        colorSuccess: "#32CD32", // Bright green for success states
        colorWarning: "#FFC107", // Warm yellow for warnings
        colorError: "#FF4D5A", // Same as primary red for errors
        colorText: "#E5E9F0", // Light text for dark backgrounds
        colorTextSecondary: "#AEBAC5", // Secondary text color
        colorBgBase: "#1E1E1E", // Deep dark background
        colorBgContainer: "#2A2A2A", // Slightly lighter container background
        colorBorder: "#434C5E", // Dark border for subtle separation
        colorBorderSecondary: "#3B4252", // Secondary border color
        fontSize: 14,
        motion: true, // Enable smooth transitions
      },
      components: {
        Button: {
          colorPrimary: "#FF4D5A", // Signature red
          colorPrimaryHover: "#FF2D3F", // Darker red on hover
          colorPrimaryActive: "#FF1D30", // Even darker red on click

          boxShadow: "0 2px 4px rgba(255, 77, 90, 0.25)", // Subtle shadow for depth
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#434C5E",
          colorBgContainer: "#2A2A2A",
          hoverBorderColor: "#FF4D5A", // Signature red on hover
          activeBorderColor: "#FF2D3F", // Darker red when active
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#2A2A2A",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Soft shadow for cards
          colorBorder: "#434C5E",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#434C5E", // Darker background on hover
          colorItemBgSelected: "rgba(255, 77, 90, 0.15)", // Subtle red tint for selected items
          colorItemTextSelected: "#FF4D5A", // Signature red for selected text

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#2A2A2A",
          headerColor: "#E5E9F0",
          rowHoverBg: "rgba(255, 77, 90, 0.1)", // Subtle red tint for hover
          borderColor: "#434C5E",
          headerBorderRadius: 8,
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.75)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          contentBg: "#2A2A2A",
          headerBg: "#2A2A2A",
          footerBg: "#2A2A2A",
        },
        Layout: {
          colorBgHeader: "#2A2A2A",
          colorBgBody: "#1E1E1E",
        },
        Divider: {
          colorSplit: "#434C5E",
        },
      },
    },
  },
  "Atom One Dark": {
    light: {
      token: {
        colorPrimary: "#61AFEF",
        colorInfo: "#61AFEF",
        colorSuccess: "#98C379",
        colorWarning: "#E5C07B",
        colorError: "#E06C75",
        colorText: "#24292e",
        colorTextSecondary: "#586069",
        colorBgBase: "#f0f0f0",
        colorBgContainer: "#ffffff",
        colorBorder: "#d9d9d9",
        colorBorderSecondary: "#d1d1d1",
        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#61AFEF",
          colorPrimaryHover: "#528BFF",
          colorPrimaryActive: "#528BFF",

          // borderWidth: 1,
          boxShadow: "none",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#d9d9d9",
          colorBgContainer: "#ffffff",
          hoverBorderColor: "#61AFEF",
          activeBorderColor: "#61AFEF",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#ffffff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          colorBorder: "#d9d9d9",
          paddingLG: 20,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#f0f0f0",
          colorItemBgSelected: "#f0f0f0",
          colorItemTextSelected: "#61AFEF",
          borderRadius: 8,
          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#f0f0f0",
          headerColor: "#24292e",
          rowHoverBg: "#f0f0f0",
          borderColor: "#d9d9d9",
          headerBorderRadius: 8,
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.45)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          contentBg: "#ffffff",
          headerBg: "#ffffff",
          footerBg: "#ffffff",
        },
        Layout: {
          colorBgHeader: "#ffffff",
          colorBgBody: "#ffffff",
          // colorBgSider: "#ffffff",
        },
        // Sider: {
        //   colorBgCollapsedButton: "#61AFEF",
        //   colorTextCollapsedButton: "#ffffff",
        //   colorBgTrigger: "#f0f0f0",
        // },
        Divider: {
          colorSplit: "#d9d9d9",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#61AFEF",
        colorInfo: "#61AFEF",
        colorSuccess: "#98C379",
        colorWarning: "#E5C07B",
        colorError: "#E06C75",
        colorText: "#ABB2BF",
        colorTextSecondary: "#5C6370",
        colorBgBase: "#282C34",
        colorBgContainer: "#1E222A",
        colorBorder: "#3E4451",
        colorBorderSecondary: "#3E4451",

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#61AFEF",
          colorPrimaryHover: "#528BFF",
          colorPrimaryActive: "#528BFF",

          // borderWidth: 1,
          boxShadow: "none",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#3E4451",
          colorBgContainer: "#1E222A",
          hoverBorderColor: "#61AFEF",
          activeBorderColor: "#61AFEF",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#1E222A",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          colorBorder: "#3E4451",
          paddingLG: 20,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#3E4451",
          colorItemBgSelected: "#3E4451",
          colorItemTextSelected: "#61AFEF",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#3E4451",
          headerColor: "#ABB2BF",
          rowHoverBg: "#3E4451",
          borderColor: "#3E4451",
          headerBorderRadius: 8,
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.45)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          contentBg: "#1E222A",
          headerBg: "#1E222A",
          footerBg: "#1E222A",
        },
        Layout: {
          colorBgHeader: "#1E222A",
          colorBgBody: "#1E222A",
          // colorBgSider: "#1E222A",
        },
        // Sider: {
        //   colorBgCollapsedButton: "#61AFEF",
        //   colorTextCollapsedButton: "#ffffff",
        //   colorBgTrigger: "#3E4451",
        // },
        Divider: {
          colorSplit: "#3E4451",
        },
      },
    },
  },
  "Modern Dracula": {
    light: {
      token: {
        colorPrimary: "#BD93F9",
        colorInfo: "#8BE9FD",
        colorSuccess: "#50FA7B",
        colorWarning: "#FFB86C",
        colorError: "#FF5555",
        colorText: "#282A36",
        colorTextSecondary: "#6272A4",
        colorBgBase: "#F8F8F2",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#DAD7E0",
        colorBorderSecondary: "#E5E3EC",
        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#BD93F9",
          colorPrimaryHover: "#A374F7",
          colorPrimaryActive: "#9B6AF6",
          boxShadow: "0 2px 4px rgba(189, 147, 249, 0.1)",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#DAD7E0",
          colorBgContainer: "#FFFFFF",
          hoverBorderColor: "#BD93F9",
          activeBorderColor: "#BD93F9",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#FFFFFF",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          colorBorder: "#E5E3EC",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#F8F8F2",
          colorItemBgSelected: "rgba(189, 147, 249, 0.1)",
          colorItemTextSelected: "#BD93F9",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#F8F8F2",
          headerColor: "#282A36",
          rowHoverBg: "rgba(189, 147, 249, 0.05)",
          borderColor: "#E5E3EC",
          headerBorderRadius: 8,
        },
        Modal: {
          borderRadiusLG: 12,
          colorBgMask: "rgba(40, 42, 54, 0.6)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          contentBg: "#FFFFFF",
          headerBg: "#FFFFFF",
          footerBg: "#FFFFFF",
        },
        Layout: {
          colorBgHeader: "#FFFFFF",
          colorBgBody: "#F8F8F2",
        },
        Divider: {
          colorSplit: "#E5E3EC",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#BD93F9",
        colorInfo: "#8BE9FD",
        colorSuccess: "#50FA7B",
        colorWarning: "#FFB86C",
        colorError: "#FF5555",
        colorText: "#F8F8F2",
        colorTextSecondary: "#6272A4",
        colorBgBase: "#282A36",
        colorBgContainer: "#1A1B23",
        colorBorder: "#44475A",
        colorBorderSecondary: "#383A4D",

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#BD93F9",
          colorPrimaryHover: "#A374F7",
          colorPrimaryActive: "#9B6AF6",

          boxShadow: "0 2px 4px rgba(189, 147, 249, 0.2)",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#44475A",
          colorBgContainer: "#1A1B23",
          hoverBorderColor: "#BD93F9",
          activeBorderColor: "#BD93F9",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          borderRadiusLG: 12,
          colorBgContainer: "#1A1B23",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          colorBorder: "#383A4D",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#383A4D",
          colorItemBgSelected: "rgba(189, 147, 249, 0.15)",
          colorItemTextSelected: "#BD93F9",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#282A36",
          headerColor: "#F8F8F2",
          rowHoverBg: "rgba(189, 147, 249, 0.1)",
          borderColor: "#383A4D",
          headerBorderRadius: 8,
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.75)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          contentBg: "#1A1B23",
          headerBg: "#1A1B23",
          footerBg: "#1A1B23",
        },
        Layout: {
          colorBgHeader: "#1A1B23",
          colorBgBody: "#282A36",
        },
        Divider: {
          colorSplit: "#383A4D",
        },
      },
    },
  },
  "Nordic Frost": {
    light: {
      token: {
        colorPrimary: "#5E81AC",
        colorInfo: "#81A1C1",
        colorSuccess: "#A3BE8C",
        colorWarning: "#EBCB8B",
        colorError: "#BF616A",
        colorText: "#2E3440",
        colorTextSecondary: "#4C566A",
        colorBgBase: "#ECEFF4",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#D8DEE9",
        colorBorderSecondary: "#E5E9F0",

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#5E81AC",
          colorPrimaryHover: "#4C6A8F",
          colorPrimaryActive: "#435E80",

          boxShadow: "0 2px 4px rgba(94, 129, 172, 0.1)",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#D8DEE9",
          hoverBorderColor: "#5E81AC",
          activeBorderColor: "#5E81AC",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#FFFFFF",
          boxShadow: "0 4px 12px rgba(46, 52, 64, 0.05)",
          colorBorder: "#E5E9F0",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#ECEFF4",
          colorItemBgSelected: "rgba(94, 129, 172, 0.1)",
          colorItemTextSelected: "#5E81AC",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#ECEFF4",
          headerColor: "#2E3440",
          rowHoverBg: "rgba(94, 129, 172, 0.05)",
          borderColor: "#E5E9F0",
        },
        Modal: {
          colorBgMask: "rgba(46, 52, 64, 0.5)",
          boxShadow: "0 12px 24px rgba(46, 52, 64, 0.1)",
          contentBg: "#FFFFFF",
          headerBg: "#FFFFFF",
          footerBg: "#FFFFFF",
        },
        Layout: {
          colorBgHeader: "#FFFFFF",
          colorBgBody: "#ECEFF4",
        },
        Divider: {
          colorSplit: "#E5E9F0",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#88C0D0",
        colorInfo: "#81A1C1",
        colorSuccess: "#A3BE8C",
        colorWarning: "#EBCB8B",
        colorError: "#BF616A",
        colorText: "#ECEFF4",
        colorTextSecondary: "#D8DEE9",
        colorBgBase: "#2E3440",
        colorBgContainer: "#3B4252",
        colorBorder: "#434C5E",
        colorBorderSecondary: "#4C566A",

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#88C0D0",
          colorPrimaryHover: "#7AB0C0",
          colorPrimaryActive: "#6CA0B0",

          boxShadow: "0 2px 4px rgba(136, 192, 208, 0.2)",
          fontWeight: 500,
        },
        Input: {
          colorBorder: "#434C5E",
          colorBgContainer: "#3B4252",
          hoverBorderColor: "#88C0D0",
          activeBorderColor: "#88C0D0",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#3B4252",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          colorBorder: "#4C566A",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#434C5E",
          colorItemBgSelected: "rgba(136, 192, 208, 0.15)",
          colorItemTextSelected: "#88C0D0",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#3B4252",
          headerColor: "#ECEFF4",
          rowHoverBg: "rgba(136, 192, 208, 0.1)",
          borderColor: "#4C566A",
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.75)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          contentBg: "#3B4252",
          headerBg: "#3B4252",
          footerBg: "#3B4252",
        },
        Layout: {
          colorBgHeader: "#3B4252",
          colorBgBody: "#2E3440",
        },
        Divider: {
          colorSplit: "#4C566A",
        },
      },
    },
  },
  Gruvbox: {
    light: {
      token: {
        colorPrimary: "#d65d0e", // Orange as primary
        colorInfo: "#458588", // Blue
        colorSuccess: "#98971a", // Green
        colorWarning: "#d79921", // Yellow
        colorError: "#cc241d", // Red
        colorText: "#3c3836", // Dark Gray
        colorTextSecondary: "#504945", // Medium Gray
        colorBgBase: "#fbf1c7", // Light Background
        colorBgContainer: "#f2e5bc", // Container Background
        colorBorder: "#d5c4a1", // Border Color
        colorBorderSecondary: "#ebdbb2", // Secondary Border

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#d65d0e",
          colorPrimaryHover: "#af3a03",
          colorPrimaryActive: "#9d0006",

          boxShadow: "0 2px 4px rgba(214, 93, 14, 0.15)",
          fontWeight: 600,
        },
        Input: {
          colorBorder: "#d5c4a1",
          colorBgContainer: "#fbf1c7",
          hoverBorderColor: "#d65d0e",
          activeBorderColor: "#d65d0e",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#f2e5bc",
          boxShadow: "0 4px 12px rgba(60, 56, 54, 0.08)",
          colorBorder: "#d5c4a1",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#ebdbb2",
          colorItemBgSelected: "rgba(214, 93, 14, 0.15)",
          colorItemTextSelected: "#d65d0e",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#ebdbb2",
          headerColor: "#3c3836",
          rowHoverBg: "rgba(214, 93, 14, 0.05)",
          borderColor: "#d5c4a1",
        },
        Modal: {
          colorBgMask: "rgba(60, 56, 54, 0.45)",
          boxShadow: "0 12px 24px rgba(60, 56, 54, 0.12)",
          contentBg: "#f2e5bc",
          headerBg: "#f2e5bc",
          footerBg: "#f2e5bc",
        },
        Layout: {
          colorBgHeader: "#f2e5bc",
          colorBgBody: "#fbf1c7",
        },
        Divider: {
          colorSplit: "#d5c4a1",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#fe8019", // Bright Orange
        colorInfo: "#83a598", // Blue
        colorSuccess: "#b8bb26", // Green
        colorWarning: "#fabd2f", // Yellow
        colorError: "#fb4934", // Red
        colorText: "#ebdbb2", // Light Text
        colorTextSecondary: "#bdae93", // Secondary Text
        colorBgBase: "#282828", // Dark Background
        colorBgContainer: "#3c3836", // Container Background
        colorBorder: "#504945", // Border Color
        colorBorderSecondary: "#665c54", // Secondary Border

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#fe8019",
          colorPrimaryHover: "#d65d0e",
          colorPrimaryActive: "#af3a03",

          boxShadow: "0 2px 4px rgba(251, 73, 52, 0.25)",
          fontWeight: 600,
        },
        Input: {
          colorBorder: "#504945",
          colorBgContainer: "#3c3836",
          hoverBorderColor: "#fe8019",
          activeBorderColor: "#fe8019",
          paddingBlock: 8,
          paddingInline: 12,
        },
        Card: {
          colorBgContainer: "#3c3836",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          colorBorder: "#504945",
          paddingLG: 24,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#504945",
          colorItemBgSelected: "rgba(254, 128, 25, 0.2)",
          colorItemTextSelected: "#fe8019",

          itemMarginInline: 8,
        },
        Table: {
          headerBg: "#504945",
          headerColor: "#ebdbb2",
          rowHoverBg: "rgba(254, 128, 25, 0.1)",
          borderColor: "#504945",
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.75)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          contentBg: "#3c3836",
          headerBg: "#3c3836",
          footerBg: "#3c3836",
        },
        Layout: {
          colorBgHeader: "#3c3836",
          colorBgBody: "#282828",
        },
        Divider: {
          colorSplit: "#504945",
        },
      },
    },
  },
  "Fluent Microsoft": {
    light: {
      token: {
        colorPrimary: "#005FB8", // Microsoft Primary Blue
        colorInfo: "#0078D4", // Communication Blue
        colorSuccess: "#13A10E", // Success Green
        colorWarning: "#FFB900", // Warning Yellow
        colorError: "#E81123", // Error Red
        colorText: "#242424", // Primary Text
        colorTextSecondary: "#605E5C", // Secondary Text
        colorBgBase: "#FFFFFF", // Base Background
        colorBgContainer: "#FAFAFA", // Container Background
        colorBorder: "#E1DFDD", // Border Color
        colorBorderSecondary: "#F3F2F1", // Secondary Border

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#005FB8",
          colorPrimaryHover: "#004C95",
          colorPrimaryActive: "#003671",

          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontWeight: 400, // Microsoft uses regular weight
        },
        Input: {
          colorBorder: "#8A8886", // Microsoft's neutral color
          colorBgContainer: "#FFFFFF",
          hoverBorderColor: "#323130", // Darker on hover
          activeBorderColor: "#005FB8", // Primary blue when active
          paddingBlock: 5, // Microsoft's standard padding
          paddingInline: 8,
        },
        Card: {
          colorBgContainer: "#FFFFFF",
          boxShadow:
            "0 1.6px 3.6px rgba(0, 0, 0, 0.13), 0 0.3px 0.9px rgba(0, 0, 0, 0.1)",
          colorBorder: "#E1DFDD",
          paddingLG: 16,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#F3F2F1",
          colorItemBgSelected: "#EAF6FF",
          colorItemTextSelected: "#005FB8",

          itemMarginInline: 2,
        },
        Table: {
          headerBg: "#F3F2F1",
          headerColor: "#242424",
          rowHoverBg: "#F3F2F1",
          borderColor: "#E1DFDD",
          // Microsoft tables typically don't have rounded headers
        },
        Modal: {
          colorBgMask: "rgba(0, 0, 0, 0.4)",
          boxShadow:
            "0 25.6px 57.6px rgba(0, 0, 0, 0.22), 0 4.8px 14.4px rgba(0, 0, 0, 0.18)",
          contentBg: "#FFFFFF",
          headerBg: "#FFFFFF",
          footerBg: "#FFFFFF",
        },
        Layout: {
          colorBgHeader: "#FFFFFF",
          colorBgBody: "#FAFAFA",
        },
        Divider: {
          colorSplit: "#E1DFDD",
        },
      },
    },
    dark: {
      token: {
        colorPrimary: "#2899F5", // Microsoft Blue for dark mode
        colorInfo: "#2899F5", // Communication Blue
        colorSuccess: "#6CCB5F", // Success Green
        colorWarning: "#FFD335", // Warning Yellow
        colorError: "#FF99A4", // Error Red
        colorText: "#FFFFFF", // Primary Text
        colorTextSecondary: "#CCCCCC", // Secondary Text
        colorBgBase: "#202020", // Base Background
        colorBgContainer: "#292929", // Container Background
        colorBorder: "#484644", // Border Color
        colorBorderSecondary: "#605E5C", // Secondary Border

        fontSize: 14,
        motion: true,
      },
      components: {
        Button: {
          colorPrimary: "#2899F5",
          colorPrimaryHover: "#1890FF",
          colorPrimaryActive: "#096DD9",

          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
          fontWeight: 400,
        },
        Input: {
          colorBorder: "#605E5C",
          colorBgContainer: "#292929",
          hoverBorderColor: "#C8C6C4",
          activeBorderColor: "#2899F5",
          paddingBlock: 5,
          paddingInline: 8,
        },
        Card: {
          colorBgContainer: "#292929",
          boxShadow:
            "0 1.6px 3.6px rgba(0, 0, 0, 0.3), 0 0.3px 0.9px rgba(0, 0, 0, 0.25)",
          colorBorder: "#484644",
          paddingLG: 16,
        },
        Menu: {
          colorItemBg: "transparent",
          colorItemBgHover: "#3B3A39",
          colorItemBgSelected: "rgba(40, 153, 245, 0.15)",
          colorItemTextSelected: "#2899F5",

          itemMarginInline: 2,
        },
        Table: {
          headerBg: "#3B3A39",
          headerColor: "#FFFFFF",
          rowHoverBg: "#3B3A39",
          borderColor: "#484644",
          headerBorderRadius: 0,
        },
        Modal: {
          borderRadiusLG: 2,
          colorBgMask: "rgba(0, 0, 0, 0.6)",
          boxShadow:
            "0 25.6px 57.6px rgba(0, 0, 0, 0.35), 0 4.8px 14.4px rgba(0, 0, 0, 0.3)",
          contentBg: "#292929",
          headerBg: "#292929",
          footerBg: "#292929",
        },
        Layout: {
          colorBgHeader: "#292929",
          colorBgBody: "#202020",
        },
        Divider: {
          colorSplit: "#484644",
        },
      },
    },
  },
  "Flat Color": {
    light: {
      token: {
        colorPrimary: "#3498DB",
        colorBgBase: "#ECF0F1",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#BDC3C7",
        colorText: "#2C3E50",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#2980B9" },
        Layout: { headerBg: "#FFFFFF" },
        Menu: { itemSelectedBg: "#3498DB20" },
        // Sider: { colorBgCollapsedButton: "#3498DB" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#3498DB",
        colorBgBase: "#2C3E50",
        colorBgContainer: "#34495E",
        colorBorder: "#4B6074",
        colorText: "#ECF0F1",
        borderRadius: 8, // Ensure borderRadius is present
      },
      components: {
        Button: { colorPrimaryHover: "#2980B9" },
        Layout: { headerBg: "#34495E" },
        Menu: { itemSelectedBg: "#3498DB20" },
        // Sider: { colorBgCollapsedButton: "#3498DB" },
      },
    },
  },
  // New Themes Below
  "Material Ocean": {
    light: {
      token: {
        colorPrimary: "#018786",
        colorBgBase: "#E8EAED",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#BDBDBD",
        colorText: "#212121",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#006964" },
        Layout: { headerBg: "#FFFFFF" },
        Menu: { itemSelectedBg: "#01878620" },
        // Sider: { colorBgCollapsedButton: "#018786" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#03DAC6",
        colorBgBase: "#121212",
        colorBgContainer: "#1E1E1E",
        colorBorder: "#333333",
        colorText: "#E0E0E0",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#00BFA5" },
        Layout: { headerBg: "#1E1E1E" },
        Menu: { itemSelectedBg: "#03DAC620" },
        // Sider: { colorBgCollapsedButton: "#03DAC6" },
      },
    },
  },
  Solarized: {
    light: {
      token: {
        colorPrimary: "#2AA198",
        colorBgBase: "#FDF6E3",
        colorBgContainer: "#EEE8D5",
        colorBorder: "#93A1A1",
        colorText: "#586E75",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#268BD2" },
        Layout: { headerBg: "#EEE8D5" },
        Menu: { itemSelectedBg: "#2AA19820" },
        // Sider: { colorBgCollapsedButton: "#2AA198" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#268BD2",
        colorBgBase: "#002B36",
        colorBgContainer: "#073642",
        colorBorder: "#586E75",
        colorText: "#839496",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#2AA198" },
        Layout: { headerBg: "#073642" },
        Menu: { itemSelectedBg: "#268BD220" },
        // Sider: { colorBgCollapsedButton: "#268BD2" },
      },
    },
  },
  Nord: {
    light: {
      token: {
        colorPrimary: "#88C0D0",
        colorBgBase: "#ECEFF4",
        colorBgContainer: "#E5E9F0",
        colorBorder: "#D8DEE9",
        colorText: "#2E3440",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#8FBCBB" },
        Layout: { headerBg: "#E5E9F0" },
        Menu: { itemSelectedBg: "#88C0D020" },
        // Sider: { colorBgCollapsedButton: "#88C0D0" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#88C0D0",
        colorBgBase: "#2E3440",
        colorBgContainer: "#3B4252",
        colorBorder: "#4C566A",
        colorText: "#ECEFF4",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#8FBCBB" },
        Layout: { headerBg: "#3B4252" },
        Menu: { itemSelectedBg: "#88C0D020" },
        // Sider: { colorBgCollapsedButton: "#88C0D0" },
      },
    },
  },
  "Monokai Pro": {
    light: {
      token: {
        colorPrimary: "#A9DC76",
        colorBgBase: "#F8F8F2",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#E6DB74",
        colorText: "#272822",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#7EC699" },
        Layout: { headerBg: "#FFFFFF" },
        Menu: { itemSelectedBg: "#A9DC7620" },
        // Sider: { colorBgCollapsedButton: "#A9DC76" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#A9DC76",
        colorBgBase: "#272822",
        colorBgContainer: "#1E1E1E",
        colorBorder: "#49483E",
        colorText: "#F8F8F2",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#7EC699" },
        Layout: { headerBg: "#1E1E1E" },
        Menu: { itemSelectedBg: "#A9DC7620" },
        // Sider: { colorBgCollapsedButton: "#A9DC76" },
      },
    },
  },
  "Pastel Dream": {
    light: {
      token: {
        colorPrimary: "#FFB3BA",
        colorBgBase: "#FFF8E7",
        colorBgContainer: "#FFFFFF",
        colorBorder: "#FFDAB9",
        colorText: "#3E2723",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#FF8C94" },
        Layout: { headerBg: "#FFFFFF" },
        Menu: { itemSelectedBg: "#FFB3BA20" },
        // Sider: { colorBgCollapsedButton: "#FFB3BA" },
      },
    },
    dark: {
      token: {
        colorPrimary: "#FFB3BA",
        colorBgBase: "#3E2723",
        colorBgContainer: "#4E342E",
        colorBorder: "#8D6E63",
        colorText: "#FFF8E7",
        borderRadius: 8,
      },
      components: {
        Button: { colorPrimaryHover: "#FF8C94" },
        Layout: { headerBg: "#4E342E" },
        Menu: { itemSelectedBg: "#FFB3BA20" },
        // Sider: { colorBgCollapsedButton: "#FFB3BA" },
      },
    },
  },
};

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const storedMode = localStorage.getItem("colorMode");
  const storedScheme = localStorage.getItem("colorScheme");
  const storedRadius = localStorage.getItem("borderRadius");
  const storedFontFamily = localStorage.getItem("fontFamily");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultMode = storedMode || (prefersDark ? "dark" : "light");
  const defaultScheme = storedScheme || "Atom One Dark";
  const defaultRadius = storedRadius ? parseInt(storedRadius) : 8;
  const defaultFontFamily = storedFontFamily || "Poppins";

  const [mode, setMode] = useState(defaultMode);
  const [colorScheme, setColorScheme] = useState(defaultScheme);
  const [borderRadius, setBorderRadius] = useState(defaultRadius);
  const [fontFamily, setFontFamily] = useState(defaultFontFamily);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
    localStorage.setItem("colorScheme", colorScheme);
    localStorage.setItem("borderRadius", borderRadius.toString());
    localStorage.setItem("fontFamily", fontFamily);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode, colorScheme, borderRadius, fontFamily]);

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const themeConfig = {
    ...colorSchemes[colorScheme][mode === "light" ? "light" : "dark"],
    token: {
      ...colorSchemes[colorScheme][mode === "light" ? "light" : "dark"].token,
      borderRadius: borderRadius,
      fontFamily: fontFamily,
    },
  };

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode: toggleColorMode,
        colorScheme,
        setColorScheme,
        borderRadius,
        setBorderRadius,
        fontFamily,
        setFontFamily,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
          token: themeConfig.token,
          components: themeConfig.components,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
