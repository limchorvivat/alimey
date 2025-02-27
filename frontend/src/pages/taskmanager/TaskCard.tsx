import React, { useState } from "react";
import { Card, Button, Tag, Form, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined, CommentOutlined } from "@ant-design/icons";
import { Task } from "./types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onCommentSubmit: (taskId: number, commentContent: string) => void;
}

const priorityColorMap: { [key: string]: string } = {
  High: "red",
  Medium: "gold",
  Low: "green",
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onCommentSubmit }) => {
  const { t } = useTranslation();
  const [commentForm] = Form.useForm();
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const isOverdue =
    task.tobeCompletedDate &&
    dayjs(task.tobeCompletedDate).isBefore(dayjs()) &&
    (!task.actualCompleteDate || dayjs(task.actualCompleteDate).isAfter(task.tobeCompletedDate));

  const handleCommentSubmit = (values: { commentContent: string }) => {
    onCommentSubmit(task.id, values.commentContent);
    commentForm.resetFields();
    setIsCommentModalVisible(false); // Close modal after submitting
  };

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
          <Button type="link" icon={<CommentOutlined />} onClick={() => setIsCommentModalVisible(true)}>
            {t("View Comments")}
          </Button>
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
            {t("Comments")}: {task.comments.length} {t("available")}
          </p>
        )}
      </div>

      <Modal
        title={t("Task Comments")}
        open={isCommentModalVisible}
        onCancel={() => setIsCommentModalVisible(false)}
        footer={null}
        width={600}
      >
        <div>
          {task.comments && task.comments.length > 0 ? (
            <div>
              <p><strong>{t("Existing Comments")}:</strong></p>
              {task.comments.map((comment) => (
                <p key={comment.id}>
                  {comment.content} - {t("By")}: {comment.author?.username || t("Unknown")} (
                  {dayjs(comment.createdAt).format("MMM D, YYYY HH:mm")})
                </p>
              ))}
            </div>
          ) : (
            <p>{t("No comments available")}</p>
          )}
          <Form form={commentForm} layout="vertical" onFinish={handleCommentSubmit} style={{ marginTop: 16 }}>
            <Form.Item
              label={t("Add Comment")}
              name="commentContent"
              rules={[{ required: true, message: t("Please enter a comment") }]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Submit Comment")}
            </Button>
          </Form>
        </div>
      </Modal>
    </Card>
  );
};