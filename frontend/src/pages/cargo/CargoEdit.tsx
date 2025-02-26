import React, { useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const CargoEdit: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "cargos",
    id,
  });

  const cargoData = queryResult?.data?.data;

  useEffect(() => {
    if (cargoData) {
      formProps.form?.setFieldsValue({
        ...cargoData,
        departuredate: cargoData.departuredate
          ? dayjs(cargoData.departuredate)
          : undefined,
        arrivaldate: cargoData.arrivaldate
          ? dayjs(cargoData.arrivaldate)
          : undefined,
      });
    }
  }, [cargoData, formProps.form]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
};

export default CargoEdit;
