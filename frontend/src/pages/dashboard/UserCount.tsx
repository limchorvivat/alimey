import React from "react";
import { Card, Statistic } from "antd";
import { useList } from "@refinedev/core";
import { useTranslation } from "react-i18next";
interface User2 {
  id: number;
  name: string;
  gender: string;
  email: string;
  categories: number[];
}

const UserCount: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useList<User2>({ resource: "user2s" });

  return (
    <Card loading={isLoading}>
      <Statistic title={t("Total Customers")} value={data?.total ?? 0} />
    </Card>
  );
};

export default UserCount;
