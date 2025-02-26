import React from "react";
import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useOne } from "@refinedev/core";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export const CargoShow: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL

  const { data: cargoData, isLoading: isCargoLoading } = useOne({
    resource: "cargos",
    id, // Fetch the record by ID
  });

  const cargo = cargoData?.data;

  return (
    <Show isLoading={isCargoLoading}>
      <Title level={5}>{t("Code")}</Title>
      <TextField value={cargo?.code} />

      <Title level={5}>{t("Description")}</Title>
      <TextField value={cargo?.description} />

      <Title level={5}>{t("Weight (kg)")}</Title>
      <TextField value={`${cargo?.weight} kg`} />

      <Title level={5}>{t("Volume (cm²)")}</Title>
      <TextField value={`${cargo?.volume} cm²`} />

      <Title level={5}>{t("Departure Date")}</Title>
      <TextField value={cargo?.departuredate} />

      <Title level={5}>{t("Arrival Date")}</Title>
      <TextField value={cargo?.arrivaldate} />

      <Title level={5}>{t("Delivery Fee")}</Title>
      <TextField value={`$ ${cargo?.deliveryfee?.toFixed(2)}`} />
    </Show>
  );
};

export default CargoShow;
