import React, { useState } from "react";
import {
  List,
  useTable,
  DeleteButton,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space, Tag, Button, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { CarrierCreate } from "./CarrierCreate"; // Import the CarrierCreate component
import { PlusOutlined } from "@ant-design/icons";

export const CarrierList: React.FC = () => {
  const { t } = useTranslation();
  const { tableProps } = useTable();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const serviceTypeLabels: { [key: string]: string } = {
    Air: t("Air Shipping"),
    Sea: t("Sea Freight"),
    Land: t("Land Transport"),
    Express: t("Express Delivery"),
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <List>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          {t("Create")}
        </Button>
      </div>
      <Drawer
        title={t("Create")}
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        <CarrierCreate />
      </Drawer>
      <Table {...tableProps} rowKey="id" dataSource={tableProps.dataSource}>
        <Table.Column dataIndex="id" title={t("ID")} sorter />
        <Table.Column dataIndex="name" title={t("Carrier Name")} sorter />
        <Table.Column
          dataIndex="serviceTypes"
          title={t("Service Type")}
          render={(value) => (
            <Tag color="blue">{serviceTypeLabels[value] || value}</Tag>
          )}
        />
        <Table.Column
          dataIndex="rates"
          title={t("Rate")}
          render={(value) => `$${value}/kg`}
        />
        <Table.Column dataIndex="contact" title={t("Contact")} />
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
