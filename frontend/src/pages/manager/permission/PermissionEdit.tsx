import React, { useEffect } from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { BaseRecord, useList } from "@refinedev/core";
import { useTranslation } from "react-i18next";

/** Data structure for Staff */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for Permission1 */
export interface Permission1 extends BaseRecord {
  id: number;
  reason: string;
  days: string;
  date_start: string;
  date_end: string;
  staff?: number | { id: number; name: string };
}

interface Permission1EditProps {
  record: Permission1 | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const Permission1Edit: React.FC<Permission1EditProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  // Prevent accessing properties if record is null
  if (!record) {
    return <div>{t("Loading")}...</div>;
  }

  const { formProps, form } = useForm<Permission1>({
    resource: "permission1s",
    action: "edit",
    id: record.id,
    redirect: false,
    defaultFormValues: {
      ...record,
      date_start: dayjs(record.date_start).format("YYYY-MM-DD"),
      date_end: dayjs(record.date_end).format("YYYY-MM-DD"),
    },
    onMutationSuccess: () => {
      form.resetFields();
      onClose();
      onSuccess?.();
    },
  });

  // Retrieve staff list for relation selection
  const { data: staffList, isLoading: staffLoading } = useList<Staff>({
    resource: "staff",
    pagination: { pageSize: 9999 },
  });

  const staffOptions =
    staffList?.data?.map((s) => ({
      label: s.name,
      value: s.id,
    })) || [];

  // Added useEffect to set form values once staff list is loaded
  useEffect(() => {
    if (staffList) {
      form.setFieldsValue({
        ...record,
        date_start: dayjs(record.date_start),
        date_end: dayjs(record.date_end),
        staff:
          typeof record.staff === "object" ? record.staff.id : record.staff,
      });
    }
  }, [record, form, staffList]);

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (values: any) => {
        const payload = {
          ...values,
          id: record.id,
          date_start: values.date_start
            ? values.date_start.format("YYYY-MM-DD")
            : "",
          date_end: values.date_end ? values.date_end.format("YYYY-MM-DD") : "",
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
        getValueProps={(value) => ({
          value: value ? dayjs(value) : "",
        })}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label={t("Date End")}
        name="date_end"
        rules={[{ required: true, message: t("Date End is required") }]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : "",
        })}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
          {t("Save Changes")}
        </Button>
      </Form.Item>
    </Form>
  );
};
