import React, { useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { useList } from "@refinedev/core";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTranslation } from "react-i18next";

interface User2 {
  id: number;
  name: string;
  sex: string; // Using "sex" instead of "gender"
  email: string;
  categories: number[];
}

const GenderChart: React.FC = () => {
  const { t } = useTranslation(); // Use translation
  const { data, isLoading } = useList<User2>({ resource: "user2s" });

  useEffect(() => {
    if (data && data.data) {
      console.log("Fetched Data:", data.data);
    }
  }, [data]);

  const maleCount =
    data?.data?.filter((user) => user.sex === "Male").length ?? 0;
  const femaleCount =
    data?.data?.filter((user) => user.sex === "Female").length ?? 0;
  const anotherCount =
    data?.data?.filter((user) => user.sex === "Another").length ?? 0;

  useEffect(() => {
    console.log("Male Count:", maleCount);
    console.log("Female Count:", femaleCount);
    console.log("Another Count:", anotherCount);
  }, [maleCount, femaleCount]);

  const chartData = [
    { name: t("Male"), value: maleCount }, // Translate "Male"
    { name: t("Female"), value: femaleCount }, // Translate "Female"
    { name: t("Another"), value: anotherCount }, // Translate "Female"
  ];

  const COLORS = ["#0088FE", "#FF8042", "#Ff0000"];

  return (
    <Card loading={isLoading} title={t("Gender Distribution")}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title={t("Male Customers")} value={maleCount} />
        </Col>
        <Col span={12}>
          <Statistic title={t("Female Customers")} value={femaleCount} />
        </Col>
        <Col span={12}>
          <Statistic title={t("Another Customers")} value={anotherCount} />
        </Col>
      </Row>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Card>
  );
};

export default GenderChart;
