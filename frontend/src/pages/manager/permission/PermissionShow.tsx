import React from "react";
import { useShow } from "@refinedev/core";
import { Divider, Modal } from "antd";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { BaseRecord } from "@refinedev/core";

const { Title, Text } = Typography;

/** Data structure for Permission1 */
export interface Permission1 extends BaseRecord {
  id: number;
  reason: string;
  days: string;
  date_start: string;
  date_end: string;
  staff?: {
    id: number;
    name: string;
  };
}

interface Permission1ShowProps {
  id: number;
  onClose?: () => void;
}

export const Permission1Show: React.FC<Permission1ShowProps> = ({
  id,
  onClose,
}) => {
  const { t } = useTranslation();
  const { queryResult } = useShow<Permission1>({
    resource: "permission1s",
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
      visible={true}
      title={t("Permission Details")}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <Title level={5}>{t("Reason")}</Title>
        <Text>{record.reason}</Text>
        <Divider />
        <Title level={5}>{t("Days")}</Title>
        <Text>{record.days}</Text>
        <Divider />
        <Title level={5}>{t("Date Start")}</Title>
        <Text>{record.date_start}</Text>
        <Divider />
        <Title level={5}>{t("Date End")}</Title>
        <Text>{record.date_end}</Text>
        <Divider />
        <Title level={5}>{t("Staff")}</Title>
        <Text>{record.staff?.name}</Text>
        <Divider />
      </div>
    </Modal>
  );
};
