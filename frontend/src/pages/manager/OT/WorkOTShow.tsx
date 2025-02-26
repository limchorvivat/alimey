import React from "react";
import { useShow } from "@refinedev/core";
import { Divider, Modal } from "antd";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { BaseRecord } from "@refinedev/core";

const { Title, Text } = Typography;

/** Data structure for WorkOt */
export interface WorkOt extends BaseRecord {
  id: number;
  date: string;
  hour: number;
  reason: string;
  staff?: {
    id: number;
    name: string;
  };
}

interface WorkOtShowProps {
  id: number;
  onClose?: () => void;
}

export const WorkOtShow: React.FC<WorkOtShowProps> = ({ id, onClose }) => {
  const { t } = useTranslation();
  const { queryResult } = useShow<WorkOt>({
    resource: "work-ots",
    id,
    meta: { populate: ["staff"] },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  if (isLoading) {
    return <div>{t("Loading")}...</div>;
  }
  if (!record) {
    return <div>{t("No data found")}</div>;
  }

  return (
    <Modal
      open={true}
      title={t("OT Details")}
      onCancel={onClose}
      footer={null}
      zIndex={1050}
    >
      <div>
        <Title level={5}>{t("Date")}</Title>
        <Text>{record.date}</Text>
        <Divider />
        <Title level={5}>{t("Hour")}</Title>
        <Text>{record.hour}</Text>
        <Divider />
        <Title level={5}>{t("Reason")}</Title>
        <Text>{record.reason}</Text>
        <Divider />
        <Title level={5}>{t("Staff")}</Title>
        <Text>{record.staff?.name}</Text>
        <Divider />
      </div>
    </Modal>
  );
};
