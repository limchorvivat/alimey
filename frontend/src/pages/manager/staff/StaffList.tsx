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
import {
  PlusOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { StaffCreate } from "./StaffCreate";
import { StaffEdit } from "./StaffEdit";
import { StaffShow } from "./StaffShow";
import { useTranslation } from "react-i18next";

/**
 * A single staff member.
 */
export interface Staff extends BaseRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  date_of_joining: string;
  salary: string;
  contact_method: "phone" | "telegram"; // Added contact method field
}

export const StaffList: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Staff[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Staff | null>(null);
  const [selectedShowRecordId, setSelectedShowRecordId] = useState<
    string | null
  >(null);
  const { t } = useTranslation();

  // Fetch the "staff" records:
  const { tableProps } = useTable<Staff>({
    resource: "staff",
    syncWithLocation: true,
  });

  useEffect(() => {
    const searchTerm = filter.toLowerCase();
    const data = (tableProps.dataSource || []).filter((record) => {
      return (
        record.name.toLowerCase().includes(searchTerm) ||
        record.id.toString().includes(searchTerm) ||
        record.phone.toLowerCase().includes(searchTerm) ||
        record.position.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(data);
  }, [filter, tableProps.dataSource]);

  const showEditModal = (record: Staff) => {
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

  const showStaffModal = (id: string) => {
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
          placeholder={t("Search by ID, Name, Phone, or Position")}
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
        title={t("Create Staff")}
        width={500}
        onCancel={closeCreateModal}
        open={createModalVisible}
        destroyOnClose
        footer={null}
      >
        <StaffCreate
          onSuccess={() => {
            closeCreateModal();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={t("Edit Staff")}
        width={500}
        onCancel={closeEditModal}
        open={editModalVisible}
        destroyOnClose
        footer={null}
      >
        {selectedRecord && (
          <StaffEdit
            record={selectedRecord}
            onClose={closeEditModal}
            onSuccess={closeEditModal}
          />
        )}
      </Modal>

      {/* Show Modal */}
      <Modal
        title={t("Staff Details")}
        width={500}
        onCancel={closeShowModal}
        open={showModalVisible}
        destroyOnClose
        footer={null}
      >
        {selectedShowRecordId !== null && (
          <StaffShow id={selectedShowRecordId} onClose={closeShowModal} />
        )}
      </Modal>

      {/* Table of staff */}
      <Table {...tableProps} dataSource={filteredData} rowKey="id">
        <Table.Column dataIndex="id" title={t("ID")} sorter />
        <Table.Column dataIndex="name" title={t("Name")} sorter />
        <Table.Column dataIndex="email" title={t("Email")} />
        <Table.Column
          dataIndex="phone"
          title={t("Phone")}
          render={(phone: string, record: Staff) => (
            <Tooltip title={phone}>
              {record.contact_method === "phone" ? (
                <PhoneOutlined />
              ) : (
                <MessageOutlined />
              )}
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="position" title={t("Position")} sorter />
        <Table.Column
          dataIndex="date_of_joining"
          title={t("Joining Date")}
          render={(value) => new Date(value).toLocaleDateString()}
        />
        <Table.Column
          dataIndex="salary"
          title={t("Salary")}
          render={(value) => `$${Number(value).toLocaleString()}`}
        />
        <Table.Column
          title={t("Actions")}
          render={(_, record: Staff) => (
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
                onClick={() => showStaffModal(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
