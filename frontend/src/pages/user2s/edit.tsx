import React, { useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { SaveOutlined, PhoneOutlined, MessageOutlined } from "@ant-design/icons";

interface User2 {
  id: number;
  name: string;
  sex: string;
  email: string;
  phone: string;  // Added phone field
  contact_method: "phone" | "telegram"; // Added contact method field
}

interface User2sEditProps {
  record: User2 | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const User2sEdit: React.FC<User2sEditProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  const { formProps, saveButtonProps } = useForm<User2>({
    resource: "user2s",
    id: record?.id.toString() || "",
    action: "edit",
    onMutationSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  useEffect(() => {
    if (record) {
      formProps.form?.setFieldsValue(record);
    }
  }, [record, formProps.form]);

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
    <Form {...formProps} layout="vertical">
      <Form.Item
        label={t("Name")}
        name="name"
        rules={[{ required: true, message: t("Name is required") }]}
      >
        <Input placeholder={t("Enter the name")} />
      </Form.Item>

      <Form.Item
        label={t("Email")}
        name="email"
        rules={[
          { required: true, message: t("Email is required") },
          { type: "email", message: t("Enter a valid email") },
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
          {t("Save Changes")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default User2sEdit;
