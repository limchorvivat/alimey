import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState("kh");

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
  };

  return (
    <div>
      <Button
        onClick={() => changeLanguage("en")}
        style={{
          backgroundColor: activeLang === "en" ? "blue" : "transparent",
        }}
      >
        {t("English")}
      </Button>
      <Button
        onClick={() => changeLanguage("kh")}
        style={{
          backgroundColor: activeLang === "kh" ? "blue" : "transparent",
        }}
      >
        {t("Khmer")}
      </Button>
    </div>
  );
};

// export default LanguageSwitcher;
