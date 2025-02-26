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

import { WorkOtsCreate } from "./WorkOTCreate";
import { WorkOtsEdit } from "./WorkOTEdit";
import { WorkOtShow } from "./WorkOTShow";

/** Data structure for a Staff member (related resource) */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for a WorkOt record */
export interface WorkOt extends BaseRecord {
  id: number;
  date: string;
  hour: number;
  reason: string;
  staff?: Staff; // populated relation
}

export const WorkOtsList: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<WorkOt[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<WorkOt | null>(null);
  const [selectedShowRecordId, setSelectedShowRecordId] = useState<
    number | null
  >(null);

  // Fetch records with the staff relation populated
  const { tableProps } = useTable<WorkOt>({
    resource: "work-ots",
    syncWithLocation: true,
    meta: { populate: ["staff"] },
  });

  useEffect(() => {
    const searchTerm = filter.toLowerCase();
    const data = (tableProps.dataSource || []).filter((record) => {
      return (
        record.date?.toLowerCase().includes(searchTerm) ||
        record.hour.toString().includes(searchTerm) ||
        record.reason?.toLowerCase().includes(searchTerm) ||
        record.staff?.name?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(data);
  }, [filter, tableProps.dataSource]);

  const showCreateModal = () => setCreateModalVisible(true);
  const closeCreateModal = () => setCreateModalVisible(false);
  const showEditModal = (record: WorkOt) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedRecord(null);
  };
  const showWorkOtModal = (id: number) => {
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
          placeholder={t("Search by Date, Hour, Reason or Staff")}
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
        <WorkOtsCreate onSuccess={closeCreateModal} />
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
          <WorkOtsEdit
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
        zIndex={1050}
      >
        {selectedShowRecordId !== null && (
          <WorkOtShow id={selectedShowRecordId} onClose={closeShowModal} />
        )}
      </Modal>

      {/* Data Table */}
      <Table {...tableProps} dataSource={filteredData} rowKey="id">
        <Table.Column dataIndex="date" title={t("Date")} sorter />
        <Table.Column dataIndex="hour" title={t("Hour")} sorter />
        <Table.Column dataIndex="reason" title={t("Reason")} />
        <Table.Column
          dataIndex="staff"
          title={t("Staff")}
          render={(staff: Staff) => (staff ? staff.name : "")}
        />
        <Table.Column
          title={t("Actions")}
          render={(_, record: WorkOt) => (
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
                onClick={() => showWorkOtModal(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
