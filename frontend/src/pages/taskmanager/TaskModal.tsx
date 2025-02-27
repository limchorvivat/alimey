import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { Task, User, User2 } from "./types";
import { useTranslation } from "react-i18next";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any; // Or proper FormInstance type from Ant Design
  users: User[];
  customers: User2[];
  editingTask?: Task | null; // Add editingTask as an optional prop
}

export const TaskModal: React.FC<TaskModalProps> = ({ visible, onCancel, onOk, form, users, customers, editingTask }) => {
  const { t } = useTranslation();

  const statusOptions = [
    { value: "To Do", label: t("To Do") },
    { value: "In Progress", label: t("In Progress") },
    { value: "Completed", label: t("Completed") },
    { value: "Cancelled", label: t("Cancelled") },
  ];

  return (
    <Modal 
      title={t("Add New Task")} 
      open={visible} 
      onCancel={onCancel} 
      onOk={onOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          label={t("Issue Description")} 
          name="issueDescription" 
          rules={[{ required: true, max: 100 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label={t("Notes")} 
          name="notes"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item 
          label={t("Priority")} 
          name="priority" 
          initialValue="Low"
        >
          <Select 
            options={[
              { value: "Low", label: t("Low") },
              { value: "Medium", label: t("Medium") },
              { value: "High", label: t("High") },
            ]}
          />
        </Form.Item>
        <Form.Item 
          label={t("Status")} 
          name="status" 
          initialValue="To Do"
        >
          <Select options={statusOptions} />
        </Form.Item>
        <Form.Item 
          label={t("Issue Date")} 
          name="issueDate"
        >
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item 
          label={t("Target Date")} 
          name="tobeCompletedDate"
        >
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item 
          label={t("Actual Completion Date")} 
          name="actualCompleteDate"
        >
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item 
          label={t("Customer")} 
          name="customer"
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={customers.map((c) => ({ value: c.id, label: c.name }))}
            allowClear
          />
        </Form.Item>
        <Form.Item 
          label={t("Resolver")} 
          name="resolver"
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={users.map((u) => ({ value: u.id, label: u.username }))}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};