import React, { useEffect } from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, DatePicker, InputNumber, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { BaseRecord, useList } from "@refinedev/core";
import { useTranslation } from "react-i18next";

/** Data structure for Staff */
export interface Staff extends BaseRecord {
  id: number;
  name: string;
}

/** Data structure for WorkOt */
export interface WorkOt extends BaseRecord {
  id: number;
  date: string;
  hour: number;
  reason: string;
  staff?: number | { id: number; name: string };
}

interface WorkOtsEditProps {
  record: WorkOt | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const WorkOtsEdit: React.FC<WorkOtsEditProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  // Prevent accessing properties if record is null
  if (!record) {
    return <div>{t("Loading")}...</div>;
  }

  const { formProps, form } = useForm<WorkOt>({
    resource: "work-ots",
    action: "edit",
    id: record.id,
    redirect: false,
    defaultFormValues: {
      ...record,
      date: dayjs(record.date).format("YYYY-MM-DD"),
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
        date: dayjs(record.date),
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
          date: values.date ? values.date.format("YYYY-MM-DD") : "",
        };
        await formProps.onFinish?.(payload);
      }}
    >
      <Form.Item
        label={t("Date")}
        name="date"
        rules={[{ required: true, message: t("Date is required") }]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : "",
        })}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
          defaultValue={record.staff}
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
