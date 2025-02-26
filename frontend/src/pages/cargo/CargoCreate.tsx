import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, DatePicker } from "antd";
import { useTranslation } from "react-i18next";

export const CargoCreate: React.FC = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps } = useForm({
    resource: "cargos",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("Code")}
          name="code"
          rules={[{ required: true, message: t("Code is required") }]}
        >
          <Input placeholder={t("Enter Code")} />
        </Form.Item>
        <Form.Item
          label={t("Description")}
          name="description"
          rules={[{ required: true, message: t("Description is required") }]}
        >
          <Input.TextArea placeholder={t("Enter Description")} />
        </Form.Item>
        <Form.Item
          label={t("Weight (kg)")}
          name="weight"
          rules={[{ required: true, message: t("Weight is required") }]}
        >
          <InputNumber placeholder={t("Enter Weight in kg")} />
        </Form.Item>
        <Form.Item
          label={t("Volume (cm²)")}
          name="volume"
          rules={[{ required: true, message: t("Volume is required") }]}
        >
          <InputNumber placeholder={t("Enter Volume in cm²")} />
        </Form.Item>
        <Form.Item
          label={t("Departure Date")}
          name="departuredate"
          rules={[{ required: true, message: t("Departure Date is required") }]}
        >
          <DatePicker showTime placeholder={t("Select Departure Date")} />
        </Form.Item>
        <Form.Item
          label={t("Arrival Date")}
          name="arrivaldate"
          rules={[{ required: true, message: t("Arrival Date is required") }]}
        >
          <DatePicker showTime placeholder={t("Select Arrival Date")} />
        </Form.Item>
        <Form.Item
          label={t("Delivery Fee")}
          name="deliveryfee"
          rules={[{ required: true, message: t("Delivery Fee is required") }]}
        >
          <InputNumber
            placeholder={t("Enter Delivery Fee")}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default CargoCreate;
