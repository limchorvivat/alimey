import React from "react";
import { Card, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Task } from "./types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityColorMap: { [key: string]: string } = {
  High: "red",
  Medium: "gold",
  Low: "green",
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const isOverdue =
    task.tobeCompletedDate &&
    dayjs(task.tobeCompletedDate).isBefore(dayjs()) &&
    (!task.actualCompleteDate || dayjs(task.actualCompleteDate).isAfter(task.tobeCompletedDate));

  return (
    <Card
      style={{
        marginBottom: 16,
        ...(isOverdue ? { border: "2px solid red" } : {}),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p>
            <strong>{task.issueDescription || t("No description")}</strong>
          </p>
          <p>{task.notes || t("No notes")}</p>
        </div>
        <div>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(task)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => onDelete(task)} />
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <Tag color={priorityColorMap[task.priority] || "gray"}>
          {t(task.priority) || t("Unknown")}
        </Tag>
        <p>{t("Status")}: {t(task.status) || t("Unknown")}</p>
        <p>
          {t("Issue Date")}: {task.issueDate ? dayjs(task.issueDate).format("MMM D, YYYY") : t("Unknown")}
        </p>
        <p>
          {t("Target Date")}:{" "}
          {task.tobeCompletedDate ? dayjs(task.tobeCompletedDate).format("MMM D, YYYY") : t("Unknown")}
        </p>
        <p>
          {t("Completed")}:{" "}
          {task.actualCompleteDate ? dayjs(task.actualCompleteDate).format("MMM D, YYYY") : t("Unknown")}
        </p>
        {task.customer && <p>{t("Customer")}: {task.customer.name || t("Unknown")}</p>}
        {task.resolver && <p>{t("Resolver")}: {task.resolver.username || t("Unknown")}</p>}
        {task.comments && task.comments.length > 0 && (
          <p>
            {t("Comments")}: {task.comments.map((c) => c.content).join(", ") || t("None")}
          </p>
        )}
      </div>
    </Card>
  );
};