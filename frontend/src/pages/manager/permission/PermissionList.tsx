import React, { useState, useEffect } from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Button, Input, Modal } from "antd";
import { BaseRecord } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

import { Permission1Create } from "./PermissionCreate";
import { Permission1Edit } from "./PermissionEdit";
import { Permission1Show } from "./PermissionShow";

/** Data structure for a Staff member (related resource) */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for a Permission1 record */
export interface Permission1 extends BaseRecord {
  id: number;
  reason: string;
  days: string;
  date_start: string;
  date_end: string;
  staff?: Staff; // populated relation
}

export const Permission1List: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<Permission1[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Permission1 | null>(
    null
  );
  const [selectedShowRecordId, setSelectedShowRecordId] = useState<
    number | null
  >(null);

  // Fetch records with the staff relation populated
  const { tableProps } = useTable<Permission1>({
    resource: "permission1s",
    syncWithLocation: true,
    meta: { populate: ["staff"] },
  });

  useEffect(() => {
    const searchTerm = filter.toLowerCase();
    const data = (tableProps.dataSource || []).filter((record) => {
      return (
        record.reason?.toLowerCase().includes(searchTerm) ||
        record.days?.toLowerCase().includes(searchTerm) ||
        record.date_start?.toLowerCase().includes(searchTerm) ||
        record.date_end?.toLowerCase().includes(searchTerm) ||
        record.staff?.name?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(data);
  }, [filter, tableProps.dataSource]);

  const showCreateModal = () => setCreateModalVisible(true);
  const closeCreateModal = () => setCreateModalVisible(false);
  const showEditModal = (record: Permission1) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };
  const showPermission1Modal = (id: number) => {
    setSelectedShowRecordId(id);
    setShowModalVisible(true);
  };
  const closeShowModal = () => {
    setShowModalVisible(false);
    setSelectedShowRecordId(null);
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
          placeholder={t(
            "Search by Reason, Days, Date Start, Date End or Staff"
          )}
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
        <Permission1Create onSuccess={closeCreateModal} />
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
          <Permission1Edit
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
        title={t("Show")}
        width={500}
        open={showModalVisible}
        onCancel={closeShowModal}
        destroyOnClose
        footer={null}
      >
        {selectedShowRecordId !== null && (
          <Permission1Show id={selectedShowRecordId} onClose={closeShowModal} />
        )}
      </Modal>

      {/* Data Table */}
      <Table {...tableProps} dataSource={filteredData} rowKey="id">
        <Table.Column dataIndex="reason" title={t("Reason")} sorter />
        <Table.Column dataIndex="days" title={t("Days")} sorter />
        <Table.Column dataIndex="date_start" title={t("Date Start")} sorter />
        <Table.Column dataIndex="date_end" title={t("Date End")} sorter />
        <Table.Column
          dataIndex="staff"
          title={t("Staff")}
          render={(staff: Staff) => (staff ? staff.name : "")}
        />
        <Table.Column
          title={t("Actions")}
          render={(_, record: Permission1) => (
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
                onClick={() => showPermission1Modal(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
