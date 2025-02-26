import React from "react";
import { useForm } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { BaseRecord } from "@refinedev/core";

/**
 * For creating a new service, "customernames" is an array of user IDs.
 * This matches a many-to-many or one-to-many relation in Strapi.
 */
export interface Service extends BaseRecord {
  id: number;
  name: string;
  description?: string;
  price: number;
  customernames: number[]; // multiple user IDs
}

export interface User2 extends BaseRecord {
  id: number;
  name: string;
}

interface ServicesCreateProps {
  onSuccess?: () => void;
}

export const ServicesCreate: React.FC<ServicesCreateProps> = ({
  onSuccess,
}) => {
  const { t } = useTranslation();

  // useForm from refine:
  const { formProps, saveButtonProps, form } = useForm<Service>({
    resource: "services",
    redirect: false,
    onMutationSuccess: () => {
      form.resetFields();
      onSuccess?.();
    },
  });

  // Fetch ALL user2 records for the multi-select
  const { data: user2List, isLoading: user2Loading } = useList<User2>({
    resource: "user2s",
    pagination: { pageSize: 9999 },
  });

  // Convert user2 records into multi-select options
  const user2Options =
    user2List?.data?.map((user2) => ({
      label: user2.name,
      value: user2.id,
    })) || [];

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
        rules={[{ required: true, message: t("Name is required") }]}
      >
        <Input placeholder={t("Enter the name")} />
      </Form.Item>

      <Form.Item label={t("Description")} name="description">
        <Input.TextArea placeholder={t("Enter the description")} />
      </Form.Item>

      <Form.Item
        label={t("Price")}
        name="price"
        rules={[{ required: true, message: t("Price is required") }]}
      >
        <InputNumber
          placeholder={t("Enter the price")}
          style={{ width: "100%" }}
          min={0}
          prefix="$"
        />
      </Form.Item>

      <Form.Item
        label={t("Customers")}
        name="customernames"
        rules={[{ required: true, message: t("Customers are required") }]}
      >
        <Select
          // mode="multiple"
          loading={user2Loading}
          placeholder={t("Select Customers")}
          options={user2Options}
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
          size="large"
        >
          {/* {t("Create Service")} */}
        </Button>
      </Form.Item>
    </Form>
  );
};
