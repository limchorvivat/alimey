import React, { useState, useEffect } from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Button, Input, Modal, Tooltip } from "antd";
import { BaseRecord } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { PlusOutlined, PhoneOutlined, MessageOutlined, MailOutlined } from "@ant-design/icons";

import { User2sCreate } from "./create";
import { User2sEdit } from "./edit";
import { User2sShow } from "./show"; // Import the User2sShow component

/** Data structure for a User2 record */
interface User2 extends BaseRecord {
  id: number;
  name: string;
  sex: string;
  email: string;
  phone: string; // Added phone field
  contact_method: "phone" | "telegram"; // Added contact method field
}

export const User2sList: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<User2[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<User2 | null>(null);
  const [selectedShowRecordId, setSelectedShowRecordId] = useState<number | null>(null);

  const { tableProps } = useTable<User2>({
    resource: "user2s",
    syncWithLocation: true,
  });

  useEffect(() => {
    if (filter === "") {
      setFilteredData(tableProps.dataSource ? [...tableProps.dataSource] : []);
    } else {
      const searchTerm = filter.toLowerCase();
      const data = (tableProps.dataSource || []).filter((record) => {
        return (
          record.id.toString().includes(searchTerm) ||
          record.name.toLowerCase().includes(searchTerm) ||
          record.sex.toLowerCase().includes(searchTerm) 
          // record.email.toLowerCase().includes(searchTerm) ||
          // record.phone.toLowerCase().includes(searchTerm) ||
          // record.contact_method.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredData([...data]);
    }
  }, [filter, tableProps.dataSource]);

  const showCreateModal = () => setCreateModalVisible(true);
  const closeCreateModal = () => setCreateModalVisible(false);
  const showEditModal = (record: User2) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };
  const showUserModal = (id: number) => {
    setSelectedShowRecordId(id);
    setShowModalVisible(true);
  };
  const closeShowModal = () => {
    setShowModalVisible(false);
    setSelectedShowRecordId(null);
  };

  const renderContactMethod = (contact_method: string, phone: string) => {
    if (contact_method === "phone") {
      return (
        <Tooltip title={phone}>
          <PhoneOutlined />
        </Tooltip>
      );
    }
    if (contact_method === "telegram") {
      return (
        <Tooltip title={phone}>
          <MessageOutlined />
        </Tooltip>
      );
    }
    return null;
  };

  const renderEmail = (email: string) => (
    <Tooltip title={email}>
      <MailOutlined />
    </Tooltip>
  );

  const renderSex = (sex: string) => {
    if (sex.toLowerCase() === "male") {
      return t("Male");
    }
    if (sex.toLowerCase() === "female") {
      return t("Female");
    }
    return t("Another");
  };

  return (
    <List>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder={t("Search by ID, Name, Sex")}
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
        open={createModalVisible}
        onCancel={closeCreateModal}
        destroyOnClose
        footer={null}
      >
        <User2sCreate onSuccess={closeCreateModal} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={t("Edit")}
        width={500}
        open={editModalVisible}
        onCancel={closeEditModal}
        destroyOnClose
        footer={null}
      >
        {selectedRecord ? (
          <User2sEdit
            record={selectedRecord}
            onClose={closeEditModal}
            onSuccess={closeEditModal}
          />
        ) : (
          <div>{t("Loading")}...</div>
        )}
      </Modal>

      {/* Show Modal */}
      <Modal
        title={t("User Details")}
        width={500}
        open={showModalVisible}
        onCancel={closeShowModal}
        destroyOnClose
        footer={null}
      >
        {selectedShowRecordId !== null && (
          <User2sShow id={selectedShowRecordId} onClose={closeShowModal} />
        )}
      </Modal>

      {/* Data Table */}
      <Table {...tableProps} dataSource={filteredData} rowKey="id">
        <Table.Column dataIndex="id" title={t("ID")} sorter />
        <Table.Column dataIndex="name" title={t("Name")} sorter />
        <Table.Column title={t("Sex")} dataIndex="sex" render={renderSex} sorter />
        <Table.Column title={t("Email")} render={(_, record: User2) => renderEmail(record.email)} sorter />
        <Table.Column
          title={t("Contact Method")}
          render={(_, record: User2) => renderContactMethod(record.contact_method, record.phone)}
        />
        <Table.Column
          title={t("Actions")}
          render={(_, record: User2) => (
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
                onClick={() => showUserModal(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
