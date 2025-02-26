import React from "react";
import { useForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core"; // Correct import for useNavigation
import { Form, Input, InputNumber, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
// Predefined service types with rates (you can modify these values)
const serviceRates = {
  Air: 5.5,
  Sea: 3.2,
  Land: 2.0,
  Express: 8.0,
};

export const CarrierCreate: React.FC = () => {
  const { t } = useTranslation();
  const { list } = useNavigation(); // Hook to navigate to the list view
  const { formProps, saveButtonProps, form } = useForm({
    resource: "carriers",
    redirect: false, // Prevent default redirection
    onMutationSuccess: () => {
      // After successfully creating a carrier, navigate to the list view
      list("carriers");
    },
  });

  const handleServiceTypeChange = (value: string) => {
    // Set corresponding rate when service type is selected
    form.setFieldsValue({
      rates: serviceRates[value as keyof typeof serviceRates],
    });
  };

  return (
    <div>
      <Form {...formProps} layout="vertical" form={form}>
        <Form.Item
          label={t("Carrier Name")}
          name="name"
          rules={[{ required: true, message: t("Carrier Name is required") }]}
        >
          <Input placeholder={t("Enter Carrier Name")} />
        </Form.Item>

        <Form.Item
          label={t("Service Type")}
          name="serviceTypes"
          rules={[{ required: true, message: t("Service Type is required") }]}
        >
          <Select
            placeholder={t("Select Service Type")}
            onChange={handleServiceTypeChange}
            options={[
              { value: "Air", label: t("Air Shipping") },
              { value: "Sea", label: t("Sea Freight") },
              { value: "Land", label: t("Land Transport") },
              { value: "Express", label: t("Express Delivery") },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={t("Rate")}
          name="rates"
          rules={[{ required: true, message: t("Rate is required") }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => {
              // Remove $ and commas, then convert to a number
              const parsedValue = value?.replace(/[$\s,]/g, "") || "0";
              return parseFloat(parsedValue);
            }}
            addonAfter="/kg"
            placeholder={t("Enter Rate")}
          />
        </Form.Item>

        <Form.Item
          label={t("Contact Information")}
          name="contact"
          rules={[
            { required: true, message: t("Contact Information is required") },
          ]}
        >
          <Input placeholder={t("Enter Contact Information")} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            {...saveButtonProps}
          >
            {t("Save")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CarrierCreate;
