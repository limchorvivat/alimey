import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, DatePicker, InputNumber, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BaseRecord, useList } from "@refinedev/core";
import dayjs from "dayjs";

/** For the staff relation */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for WorkOt record (create) */
export interface WorkOt extends BaseRecord {
  id: number;
  date: string; // or Date
  hour: number;
  reason: string;
  staff?: number; // We'll store just the staff ID on create
}

interface WorkOtsCreateProps {
  onSuccess?: () => void;
}

export const WorkOtsCreate: React.FC<WorkOtsCreateProps> = ({ onSuccess }) => {
  const { t } = useTranslation();

  // Refine form for create
  const { formProps, saveButtonProps, form } = useForm<WorkOt>({
    resource: "work-ots",
    redirect: false,
    onMutationSuccess: () => {
      form.resetFields();
      onSuccess?.();
    },
  });

  // Retrieve staff list for the "staff" relation
  // Adjust "resource" name if your staff endpoint is different (e.g., "staffs")
  const { data: staffList, isLoading: staffLoading } = useList<Staff>({
    resource: "staff",
    pagination: { pageSize: 9999 }, // fetch all if needed
  });

  // Convert staff data into Select options
  const staffOptions =
    staffList?.data?.map((s) => ({
      label: s.name,
      value: s.id,
    })) || [];

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (values: Partial<WorkOt>) => {
        const payload = {
          ...values,
          date: values.date
            ? (dayjs(values.date) as dayjs.Dayjs).format("YYYY-MM-DD")
            : "",
        };
        await formProps.onFinish?.(payload);
      }}
    >
      <Form.Item
        label={t("Date")}
        name="date"
        rules={[{ required: true, message: t("Date is required") }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label={t("Hour")}
        name="hour"
        rules={[{ required: true, message: t("Hour is required") }]}
      >
        <InputNumber style={{ width: "100%" }} min={0} />
      </Form.Item>

      <Form.Item
        label={t("Reason")}
        name="reason"
        rules={[{ required: true, message: t("Reason is required") }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label={t("Staff")}
        name="staff"
        rules={[{ required: true, message: t("Staff is required") }]}
      >
        <Select
          loading={staffLoading}
          placeholder={t("Select Staff")}
          options={staffOptions}
          allowClear
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={saveButtonProps.disabled}
          block
        >
          {t("Create")}
        </Button>
      </Form.Item>
    </Form>
  );
};
