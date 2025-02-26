import React from "react";
import { useShow, BaseRecord } from "@refinedev/core";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

interface Staff extends BaseRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  date_of_joining: string;
  salary: string;
  contact_method: "phone" | "telegram"; // Added contact method field
}

export const StaffShow: React.FC<{ id: string; onClose: () => void }> = ({
  id,
  onClose,
}) => {
  const { t } = useTranslation();
  const { queryResult } = useShow<Staff>({
    resource: "staff",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const staff = data?.data;

  if (isLoading) return <span>{t("Loading...")}</span>;

  return (
    <Modal
      visible={true}
      title={t("Staff Details")}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p>
          <strong>{t("ID")}:</strong> {staff?.id}
        </p>
        <p>
          <strong>{t("Name")}:</strong> {staff?.name}
        </p>
        <p>
          <strong>{t("Email")}:</strong> {staff?.email}
        </p>
        <p>
          <strong>{t("Phone")}:</strong> {staff?.phone}
        </p>
        <p>
          <strong>{t("Position")}:</strong> {staff?.position}
        </p>
        <p>
          <strong>{t("Date of Joining")}:</strong>{" "}
          {new Date(staff?.date_of_joining ?? "").toLocaleDateString()}
        </p>
        <p>
          <strong>{t("Salary")}:</strong> $
          {Number(staff?.salary).toLocaleString()}
        </p>
        <p>
          <strong>{t("Contact Method")}:</strong>{" "}
          {staff?.contact_method === "phone" ? t("Phone") : t("Telegram")}
        </p>
      </div>
    </Modal>
  );
};
