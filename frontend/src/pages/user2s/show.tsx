import React from "react";
import { useShow, BaseRecord } from "@refinedev/core";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { PhoneOutlined, MessageOutlined } from "@ant-design/icons";

// Define the structure of a User2 record
interface User2 extends BaseRecord {
  id: number;
  name: string;
  sex: string;
  email: string;
  phone: string; // Added phone field
  contact_method: "phone" | "telegram"; // Added contact method field
}

export const User2sShow: React.FC<{ id: number; onClose: () => void }> = ({ id, onClose }) => {
  const { t } = useTranslation();
  const { queryResult } = useShow<User2>({
    resource: "user2s",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const user2 = data?.data;

  if (isLoading) return <span>Loading...</span>;

  const renderSex = (sex: string) => {
    if (sex.toLowerCase() === "male") {
      return t("Male");
    }
    if (sex.toLowerCase() === "female") {
      return t("Female");
    }
    return t("Another");
  };

  return (
    <Modal
      visible={true}
      title={t("User Details")}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p>
          <strong>{t("ID")}:</strong> {user2?.id}
        </p>
        <p>
          <strong>{t("Name")}:</strong> {user2?.name}
        </p>
        <p>
          <strong>{t("Sex")}:</strong> {user2 && renderSex(user2.sex)}
        </p>
        <p>
          <strong>{t("Email")}:</strong> {user2?.email}
        </p>
        <p>
          <strong>{t("Phone")}:</strong> {user2?.phone}
        </p>
        <p>
          <strong>{t("Contact Method")}:</strong> 
          {user2?.contact_method === "phone" ? (
            <> {t("Phone")}</>
          ) : (
            <> {t("Telegram")}</>
          )}
        </p>
      </div>
    </Modal>
  );
};
