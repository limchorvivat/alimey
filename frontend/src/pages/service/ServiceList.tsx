import React, { useState, useEffect } from "react";
import {
  List,
  useTable,
  DeleteButton,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space, Button, Input, Modal, Tooltip } from "antd";
import { BaseRecord } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

import { ServicesCreate } from "./ServiceCreate";
import { ServicesEdit } from "./ServiceEdit";
import { ServiceShow } from "./ServiceShow";

/**
 * A single user in Strapi
 */
export interface User2 extends BaseRecord {
  id: number;
  name: string;
}

/**
 * Service has a many-to-many or one-to-many relation to `User2`.
 * "customernames" is an array of user objects returned by Strapi (when populated).
 */
export interface Service extends BaseRecord {
  id: number;
  name: string;
  price: number;
  description?: string;
  customernames?: User2[]; // multiple users
}

// Function to truncate the text if it's longer than 25 characters
const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export const ServicesList: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Service[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Service | null>(null);
  const [selectedShowRecordId, setSelectedShowRecordId] = useState<
    number | null
  >(null);

  // Fetch the "services" with "customernames" populated:
  const { tableProps } = useTable<Service>({
    resource: "services",
    syncWithLocation: true,
    meta: { populate: ["customernames"] },
  });

  useEffect(() => {
    const searchTerm = filter.toLowerCase();
    const data = (tableProps.dataSource || []).filter((record) => {
      return (
        record.name.toLowerCase().includes(searchTerm) ||
        record.id.toString().includes(searchTerm) ||
        (record.price !== undefined &&
          record.price.toString().includes(searchTerm)) ||
        (record.customernames &&
          record.customernames.some((user) =>
            user.name.toLowerCase().includes(searchTerm)
          ))
      );
    });
    setFilteredData(data);
  }, [filter, tableProps.dataSource]);

  const showEditModal = (record: Service) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const showServiceModal = (id: number) => {
    setSelectedShowRecordId(id);
    setShowModalVisible(true);
  };

  const closeShowModal = () => {
    setShowModalVisible(false);
    setSelectedShowRecordId(null);
  };

  return (
    <List>
      {/* Top Bar: Search and Create Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder={t("Search by ID, Service, Customer, or Price")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          {t("Create")}
        </Button>
      </div>

      {/* Create Modal */}
      <Modal
        title={t("Create")}
        width={500}
        onCancel={closeCreateModal}
        open={createModalVisible}
        destroyOnClose
        footer={null}
      >
        <ServicesCreate
          onSuccess={() => {
            closeCreateModal();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={t("Edit")}
        width={500}
        onCancel={closeEditModal}
        open={editModalVisible}
        destroyOnClose
        footer={null}
      >
        {selectedRecord && (
          <ServicesEdit
            record={{
              ...selectedRecord,
              customernames: Array.isArray(selectedRecord.customernames)
                ? selectedRecord.customernames.map((user) =>
                    typeof user === "object" ? user.id : user
                  )
                : [],
            }}
            onClose={closeEditModal}
            onSuccess={closeEditModal}
          />
        )}
      </Modal>

      {/* Show Modal */}
      <Modal
        title={t("Service Details")}
        width={500}
        onCancel={closeShowModal}
        open={showModalVisible}
        destroyOnClose
        footer={null}
      >
        {selectedShowRecordId !== null && (
          <ServiceShow id={selectedShowRecordId} onClose={closeShowModal} />
        )}
      </Modal>

      {/* Table of services */}
      <Table {...tableProps} dataSource={filteredData} rowKey="id">
        <Table.Column dataIndex="id" title={t("ID")} sorter />
        <Table.Column dataIndex="name" title={t("Service")} sorter />
        <Table.Column
          dataIndex="price"
          title={t("Price")}
          sorter
          render={(price: number) => `$${price.toFixed(2)}`}
        />
        <Table.Column
          dataIndex="description"
          title={t("Description")}
          render={(text: string) => (
            <Tooltip title={text.length > 25 ? text : ""}>
              <Button
                type="link"
                style={{
                  color: text.length > 25 ? "black" : "inherit",
                  padding: 0,
                  border: text.length > 25 ? "1px solid" : "none",
                  backgroundColor: text.length > 25 ? "skyblue" : "inherit",
                }}
              >
                {text.length > 25 ? t("Too_Long") : text}
              </Button>
            </Tooltip>
          )}
        />
        <Table.Column
          dataIndex="customernames"
          title={t("Customer")}
          render={(customers: User2[]) =>
            customers && customers.length > 0
              ? customers.map((u) => u.name).join(", ")
              : "N/A"
          }
        />
        <Table.Column
          title={t("Actions")}
          dataIndex="actions"
          render={(_, record: Service) => (
            <Space>
              <EditButton
                hideText
                size="small"
                onClick={() => showEditModal(record)}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={() => showServiceModal(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
