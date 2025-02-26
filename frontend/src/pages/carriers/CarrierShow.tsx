import React from "react";
import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export const CarrierShow: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: carrierData, isLoading: isCarrierLoading } = useOne({
    resource: "carriers",
    id,
  });

  const carrier = carrierData?.data;

  return (
    <Show isLoading={isCarrierLoading}>
      <Title level={5}>{t("Carrier Name")}</Title>
      <TextField value={carrier?.name} />

      <Title level={5}>{t("Contact Information")}</Title>
      <TextField value={carrier?.contact} />

      <Title level={5}>{t("Service Types")}</Title>
      <TextField value={carrier?.serviceTypes} />

      <Title level={5}>{t("Rates")}</Title>
      <TextField value={carrier?.rates} />
    </Show>
  );
};

export default CarrierShow;
