import React from "react";
import { useShow, BaseRecord } from "@refinedev/core";
import { Descriptions, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface Service extends BaseRecord {
  id: number;
  name: string;
  description?: string;
  price: number;
  customernames?: { id: number; name: string }[];
}

export const ServiceShow: React.FC<{ id: number; onClose: () => void }> = ({
  id,
  onClose,
}) => {
  const { t } = useTranslation();
  const { queryResult } = useShow<Service>({
    resource: "services",
    id: id,
  });
  const { data, isLoading } = queryResult;

  const service = data?.data;

  if (isLoading) return <span>Loading...</span>;

  return (
    <Modal
      visible={true}
      title={t("Service Details")}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p>
          <strong>{t("ID")}:</strong> {service?.id}
        </p>
        <p>
          <strong>{t("Name")}:</strong> {service?.name}
        </p>
        <p>
          <strong>{t("Description")}:</strong> {service?.description}
        </p>
        <p>
          <strong>{t("Price")}:</strong> ${service?.price.toFixed(2)}
        </p>
        <p>
          <strong>{t("Customer_Name")}:</strong>{" "}
          {service?.customernames
            ? service.customernames.map((user) => user.name).join(", ")
            : "N/A"}
        </p>
      </div>
    </Modal>
  );
};
