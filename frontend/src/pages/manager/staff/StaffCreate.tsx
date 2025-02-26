import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import {
  SaveOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { BaseRecord } from "@refinedev/core";

/**
 * For creating a new staff member.
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

interface StaffCreateProps {
  onSuccess?: () => void;
}

export const StaffCreate: React.FC<StaffCreateProps> = ({ onSuccess }) => {
  const { t } = useTranslation();

  // useForm from refine:
  const { formProps, saveButtonProps, form } = useForm<Staff>({
    resource: "staff",
    redirect: false,
    onMutationSuccess: () => {
      form.resetFields();
      onSuccess?.();
    },
  });

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (values) => {
        try {
          await formProps.onFinish?.(values);
        } catch (err) {
          console.error("Submission error:", err);
        }
      }}
    >
      <Form.Item
        label={t("Name")}
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder={t("Enter the name")} />
      </Form.Item>

      <Form.Item
        label={t("Email")}
        name="email"
        rules={[
          { required: true, message: "Email is required", type: "email" },
        ]}
      >
        <Input placeholder={t("Enter the email")} />
      </Form.Item>

      <Form.Item
        label={t("Phone")}
        name="phone"
        rules={[{ required: true, message: "Phone is required" }]}
      >
        <Input placeholder={t("Enter the phone number")} />
      </Form.Item>

      <Form.Item
        label={t("Position")}
        name="position"
        rules={[{ required: true, message: "Position is required" }]}
      >
        <Input placeholder={t("Enter the position")} />
      </Form.Item>

      <Form.Item
        label={t("Date of Joining")}
        name="date_of_joining"
        rules={[{ required: true, message: "Date of Joining is required" }]}
      >
        <Input placeholder={t("Enter the date of joining")} />
      </Form.Item>

      <Form.Item
        label={t("Salary")}
        name="salary"
        rules={[{ required: true, message: "Salary is required" }]}
      >
        <InputNumber
          placeholder={t("Enter the salary")}
          style={{ width: "100%" }}
          min={0}
          prefix="$"
        />
      </Form.Item>

      <Form.Item
        label={t("Contact Method")}
        name="contact_method"
        rules={[{ required: true, message: "Contact Method is required" }]}
      >
        <Select placeholder={t("Select a contact method")}>
          <Select.Option value="phone">
            <PhoneOutlined /> {t("Phone")}
          </Select.Option>
          <Select.Option value="telegram">
            <MessageOutlined /> {t("Telegram")}
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={saveButtonProps.disabled}
          block
          size="large"
        >
          Create Staff
        </Button>
      </Form.Item>
    </Form>
  );
};
