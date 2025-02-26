import React, { useState, useEffect } from "react";
import { useForm } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { BaseRecord } from "@refinedev/core";
import { useTranslation } from "react-i18next";

/**
 * For editing a service, "customernames" is an array of user IDs.
 */
export interface Service extends BaseRecord {
  id: number;
  name: string;
  description?: string;
  price: number;
  customernames: number[];
}

export interface User2 extends BaseRecord {
  id: number;
  name: string;
}

interface ServicesEditProps {
  record: Service;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ServicesEdit: React.FC<ServicesEditProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  // Initialize form with the passed record:
  const { formProps, form } = useForm<Service>({
    resource: "services",
    action: "edit", // Ensure this updates the record instead of creating a new one
    id: record.id,
    redirect: false,
    defaultFormValues: record,
    onMutationSuccess: () => {
      form.resetFields();
      onClose();
      onSuccess?.();
    },
  });

  // Fetch all user2 records for the multi-select
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

  useEffect(() => {
    form.setFieldsValue({
      customernames: record.customernames,
    });
  }, [record, form]);

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (values) => {
        console.log("Submitting Edit:", values); // Debugging
        try {
          await formProps.onFinish?.({
            ...values,
            id: record.id, // Ensure ID is passed for update
            customernames: record.customernames, // Preserve default customernames
          });
        } catch (err) {
          console.error("Submission error:", err);
        }
      }}
    >
      <Form.Item label={t("Name")} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={t("Description")} name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={t("Price")} name="price" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} prefix="$" />
      </Form.Item>

      <Form.Item label={t("Customer_Name")} name="customernames">
        <Select
          loading={user2Loading}
          placeholder={t("Select Customers")}
          options={user2Options}
          defaultValue={record.customernames}
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
