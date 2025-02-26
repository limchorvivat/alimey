import React, { useEffect } from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, InputNumber, DatePicker, Select } from "antd";
import {
  SaveOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { BaseRecord } from "@refinedev/core";
import dayjs from "dayjs";

/**
 * For editing a staff member.
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

interface StaffEditProps {
  record: Staff;
  onClose: () => void;
  onSuccess?: () => void;
}

export const StaffEdit: React.FC<StaffEditProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  // Initialize form with the passed record:
  const { formProps, form } = useForm<Staff>({
    resource: "staff",
    action: "edit", // Ensure this updates the record instead of creating a new one
    id: record.id,
    redirect: false,
    defaultFormValues: {
      ...record,
      date_of_joining: dayjs(record.date_of_joining).isValid()
        ? dayjs(record.date_of_joining).format("YYYY-MM-DD")
        : "", // Convert date_of_joining to string format
    },
    onMutationSuccess: () => {
      form.resetFields();
      onClose();
      onSuccess?.();
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      ...record,
      date_of_joining: dayjs(record.date_of_joining).isValid()
        ? dayjs(record.date_of_joining)
        : "", // Convert date_of_joining to dayjs object
    });
  }, [record, form]);

  const formatDateForSubmission = (date: dayjs.Dayjs) => {
    return date.format("YYYY-MM-DD");
  };

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (values: any) => {
        console.log("Submitting Edit:", values); // Debugging
        try {
          await formProps.onFinish?.({
            ...values,
            id: record.id, // Ensure ID is passed for update
            date_of_joining: values.date_of_joining
              ? formatDateForSubmission(values.date_of_joining)
              : null, // Format date_of_joining for submission
          });
        } catch (err) {
          console.error("Submission error:", err);
        }
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Position" name="position" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of Joining"
        name="date_of_joining"
        rules={[{ required: true, message: "Date is required" }]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : "",
        })}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} prefix="$" />
      </Form.Item>

      <Form.Item
        label="Contact Method"
        name="contact_method"
        rules={[{ required: true, message: "Contact Method is required" }]}
      >
        <Select placeholder="Select a contact method">
          <Select.Option value="phone">
            <PhoneOutlined /> Phone
          </Select.Option>
          <Select.Option value="telegram">
            <MessageOutlined /> Telegram
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};
