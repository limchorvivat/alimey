import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BaseRecord, useList } from "@refinedev/core";
import dayjs from "dayjs";

/** For the staff relation */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for Permission1 record (create) */
export interface Permission1 extends BaseRecord {
  id: number;
  reason: string;
  days: string;
  date_start: string;
  date_end: string;
  staff?: number; // We'll store just the staff ID on create
}

interface Permission1CreateProps {
  onSuccess?: () => void;
}

export const Permission1Create: React.FC<Permission1CreateProps> = ({
  onSuccess,
}) => {
  const { t } = useTranslation();

  // Refine form for create
  const { formProps, saveButtonProps, form } = useForm<Permission1>({
    resource: "permission1s",
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
      onFinish={async (values: Partial<Permission1>) => {
        const payload = {
          ...values,
          date_start: values.date_start
            ? (dayjs(values.date_start) as dayjs.Dayjs).format("YYYY-MM-DD")
            : "",
          date_end: values.date_end
            ? (dayjs(values.date_end) as dayjs.Dayjs).format("YYYY-MM-DD")
            : "",
        };
        await formProps.onFinish?.(payload);
      }}
    >
      <Form.Item
        label={t("Reason")}
        name="reason"
        rules={[{ required: true, message: t("Reason is required") }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label={t("Days")}
        name="days"
        rules={[{ required: true, message: t("Days are required") }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label={t("Date Start")}
        name="date_start"
        rules={[{ required: true, message: t("Date Start is required") }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label={t("Date End")}
        name="date_end"
        rules={[{ required: true, message: t("Date End is required") }]}
      >
        <DatePicker style={{ width: "100%" }} />
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
