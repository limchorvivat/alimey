import React, { useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Predefined service types with rates (you can modify these values)
const serviceRates = {
  Air: 5.5,
  Sea: 3.2,
  Land: 2.0,
  Express: 8.0,
};

interface Carrier {
  id: number;
  name: string;
  serviceTypes: string;
  rates: number;
  contact: string;
}

export const CarrierEdit: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL

  const { formProps, saveButtonProps, queryResult } = useForm<Carrier>({
    resource: "carriers",
    id, // Pass the ID to fetch the carrier record
  });

  // Extract carrier data for initial form population
  const carrierData = queryResult?.data?.data;

  useEffect(() => {
    if (carrierData) {
      formProps.form?.setFieldsValue(carrierData);
    }
  }, [carrierData, formProps.form]);

  const handleServiceTypeChange = (value: string) => {
    formProps.form?.setFieldsValue({
      rates: serviceRates[value as keyof typeof serviceRates],
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        {/* Name Field */}
        <Form.Item
          label={t("Carrier Name")}
          name="name"
          rules={[{ required: true, message: t("Carrier Name is required") }]}
        >
          <Input placeholder={t("Enter Carrier Name")} />
        </Form.Item>

        {/* Service Type Field */}
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

        {/* Rate Field */}
        <Form.Item
          label={t("Rate")}
          name="rates"
          rules={[{ required: true, message: t("Rate is required") }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => Number(value?.replace(/[$\s,]/g, "") || 0)}
            addonAfter="/kg"
            placeholder={t("Enter Rate")}
          />
        </Form.Item>

        {/* Contact Information Field */}
        <Form.Item
          label={t("Contact Information")}
          name="contact"
          rules={[
            { required: true, message: t("Contact Information is required") },
          ]}
        >
          <Input placeholder={t("Enter Contact Information")} />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default CarrierEdit;
