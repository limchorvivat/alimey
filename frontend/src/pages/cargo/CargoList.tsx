import React from "react";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface Cargo {
  id: number;
  code: string;
  description: string;
  weight: number;
  volume: number;
  departuredate: string;
  arrivaldate: string;
  deliveryfee: number;
}

export const CargoList: React.FC = () => {
  const { t } = useTranslation();
  const { tableProps } = useTable<Cargo>({
    resource: "cargos",
    sorters: {
      initial: [{ field: "code", order: "asc" }],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="code" title={t("Code")} sorter />
        <Table.Column dataIndex="description" title={t("Description")} sorter />
        <Table.Column
          dataIndex="weight"
          title={t("Weight (kg)")}
          render={(value) => `${value} kg`}
        />
        <Table.Column
          dataIndex="volume"
          title={t("Volume (cm²)")}
          render={(value) => `${value} cm²`}
        />
        <Table.Column
          dataIndex="departuredate"
          title={t("Departure Date")}
          render={(value) => value && dayjs(value).format("YYYY-MM-DD HH:mm")}
        />
        <Table.Column
          dataIndex="arrivaldate"
          title={t("Arrival Date")}
          render={(value) => value && dayjs(value).format("YYYY-MM-DD HH:mm")}
        />
        <Table.Column
          dataIndex="deliveryfee"
          title={t("Delivery Fee")}
          render={(value) =>
            value !== null && value !== undefined
              ? `$ ${value.toFixed(2)}`
              : "$ 0.00"
          }
        />
        <Table.Column
          title={t("Actions")}
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default CargoList;
