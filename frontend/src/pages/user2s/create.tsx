import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import {
  SaveOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";

interface User2sCreateProps {
  onSuccess?: () => void;
}

interface User2 {
  id: number;
  name: string;
  sex: string;
  email: string;
  phone: string;  // Added phone field
  contact_method: "phone" | "telegram"; // Added contact method field
}

export const User2sCreate: React.FC<User2sCreateProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps, form } = useForm<User2>({
    resource: "user2s",
    redirect: false,
    onMutationSuccess: () => {
      form.resetFields();
      onSuccess?.();
    },
  });

  const genderOptions = [
    { value: "Another", label: t("Another") },
    { value: "Male", label: t("Male") },
    { value: "Female", label: t("Female") },
  ];

  const contactMethodOptions = [
    { value: "phone", label: (<><PhoneOutlined /> {t("Phone")}</>) },
    { value: "telegram", label: (<><MessageOutlined /> {t("Telegram")}</>) },
  ];

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
      <Form.Item label={t("Name")} name="name" rules={[{ required: true }]}>
        <Input placeholder={t("Enter the name")} />
      </Form.Item>

      <Form.Item
        label={t("Email")}
        name="email"
        rules={[
          { required: true, type: "email", message: t("Enter a valid email") },
        ]}
      >
        <Input placeholder={t("Enter the email")} />
      </Form.Item>

      <Form.Item
        label={t("Phone")}
        name="phone"
        rules={[{ required: true, message: t("Phone is required") }]}
      >
        <Input placeholder={t("Enter the phone number")} />
      </Form.Item>

      <Form.Item
        label={t("Sex")}
        name="sex"
        rules={[{ required: true, message: t("Gender is required") }]}
      >
        <Select placeholder={t("Select gender")} options={genderOptions} />
      </Form.Item>

      <Form.Item
        label={t("Contact Method")}
        name="contact_method"
        rules={[{ required: true, message: t("Contact Method is required") }]}
      >
        <Select placeholder={t("Select a contact method")} options={contactMethodOptions} />
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
          {t("Create User")}
        </Button>
      </Form.Item>
    </Form>
  );
};
