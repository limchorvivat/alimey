import React, { useState, useEffect } from "react";
import { 
  useList, 
  useUpdate, 
  useCreate, 
  useDelete, 
  useGetIdentity, 
  HttpError 
} from "@refinedev/core";
import { notification, Modal, Form } from "antd";
import { TaskBoard } from "./TaskBoard";
import { TaskModal } from "./TaskModal";
import { Task, User, User2 } from "./types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Kanban: React.FC = () => {
  const { t } = useTranslation();
  const { data: user } = useGetIdentity<User>();
  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm] = Form.useForm();

  const { data: tasksData, error: tasksError } = useList<Task>({
    resource: "task-managements",
    meta: { 
      pagination: { current: 1, pageSize: 25 }, 
      populate: ["customer", "resolver", "comments"] 
    },
  });
  const { data: usersData, error: usersError } = useList<User>({ resource: "users" });
  const { data: user2sData, error: user2sError } = useList<User2>({ resource: "user2s" });

  const { mutate: updateTask } = useUpdate<Task, HttpError>();
  const { mutate: deleteTask } = useDelete<Task, HttpError>();
  const { mutate: createTask } = useCreate<Task, HttpError>();

  const tasks = tasksData?.data || [];
  const users = usersData?.data || [];
  const customers = user2sData?.data || [];

  useEffect(() => {
    console.log("Raw tasksData from API:", tasksData);
    console.log("Users Data:", usersData);
    console.log("User2s Data:", user2sData);
    if (tasksError) console.error("Tasks Fetch Error:", tasksError);
    if (usersError) console.error("Users Fetch Error:", usersError);
    if (user2sError) console.error("User2s Fetch Error:", user2sError);
  }, [tasksError, usersError, user2sError, tasksData, usersData, user2sData]);

  console.log("Processed tasks array:", tasks);

  // Check for tasks nearing target date (within 2 days) and in "In Progress"
  useEffect(() => {
    tasks.forEach((task) => {
      if (
        task.tobeCompletedDate &&
        task.status === t("In Progress") && // Use translated status
        dayjs(task.tobeCompletedDate).diff(dayjs(), "day") <= 2 &&
        dayjs(task.tobeCompletedDate).isAfter(dayjs()) // Not yet overdue
      ) {
        notification.warning({
          message: t("Task Approaching Deadline"),
          description: t("Task nearing target date", { description: task.issueDescription }),
          duration: 0,
        });
      }
    });
  }, [tasks, t]);

  const handleTaskUpdate = (taskId: number, status: string) => {
    console.log("Updating task with ID:", taskId, "to status:", status);
    updateTask({ 
      resource: "task-managements", 
      id: taskId, 
      values: { status } 
    }, {
      onSuccess: () => {
        console.log("Task updated successfully with ID:", taskId);
        notification.success({
          message: t("Task Updated"),
          description: t("Task status updated successfully"),
        });
      },
      onError: (error: HttpError) => {
        console.error("Error updating task with ID:", taskId, error);
        notification.error({
          message: t("Update Failed"),
          description: t("Failed to update task", { message: error.message || t("Unknown") }),
          duration: 0,
        });
      },
    });
  };

  const handleTaskDelete = (task: Task) => {
    Modal.confirm({
      title: t("Are you sure you want to delete this task?"),
      onOk: () => {
        console.log("Deleting task with ID:", task.id);
        deleteTask({ 
          resource: "task-managements", 
          id: task.id 
        }, {
          onSuccess: () => {
            notification.success({
              message: t("Task Deleted"),
              description: t("Task deleted successfully"),
            });
          },
          onError: (error: HttpError) => {
            console.error("Error deleting task with ID:", task.id, error);
            notification.error({
              message: t("Deletion Failed"),
              description: t("Failed to delete task", { message: error.message || t("Unknown") }),
              duration: 0,
            });
          },
        });
      },
    });
  };

  const handleTaskEdit = (task: Task) => {
    console.log("Editing task:", task);
    setEditingTask(task);
    taskForm.setFieldsValue({
      issueDescription: task.issueDescription,
      notes: task.notes,
      priority: task.priority,
      status: task.status,
      issueDate: task.issueDate ? dayjs(task.issueDate) : null,
      tobeCompletedDate: task.tobeCompletedDate ? dayjs(task.tobeCompletedDate) : null,
      actualCompleteDate: task.actualCompleteDate ? dayjs(task.actualCompleteDate) : null,
      customer: task.customer?.id,
      resolver: task.resolver?.id,
    });
  };

  const handleTaskSubmit = () => {
    taskForm.validateFields().then((values) => {
      const taskData = {
        issueDescription: values.issueDescription,
        notes: values.notes,
        priority: values.priority,
        status: values.status,
        issueDate: values.issueDate ? dayjs(values.issueDate).toISOString() : null,
        tobeCompletedDate: values.tobeCompletedDate ? dayjs(values.tobeCompletedDate).toISOString() : null,
        actualCompleteDate: values.actualCompleteDate ? dayjs(values.actualCompleteDate).toISOString() : null,
        customer: values.customer ? Number(values.customer) : null,
        resolver: values.resolver ? Number(values.resolver) : null,
        comments: [],
      };
      console.log("Submitting task data:", taskData);

      if (editingTask) {
        updateTask({ 
          resource: "task-managements", 
          id: editingTask.id, 
          values: taskData 
        }, {
          onSuccess: () => {
            notification.success({
              message: t("Task Updated"),
              description: t("Task status updated successfully"),
            });
            setEditingTask(null);
          },
          onError: (error: HttpError) => {
            console.error("Error updating task with ID:", editingTask.id, error);
            notification.error({
              message: t("Update Failed"),
              description: t("Failed to update task", { message: error.message || t("Unknown") }),
              duration: 0,
            });
          },
        });
      } else {
        createTask({ 
          resource: "task-managements", 
          values: taskData 
        }, {
          onSuccess: () => {
            notification.success({
              message: t("Task Created"),
              description: t("Task created successfully"),
            });
          },
          onError: (error: HttpError) => {
            console.error("Error creating task:", error);
            notification.error({
              message: t("Creation Failed"),
              description: t("Failed to create task", { message: error.message || t("Unknown") }),
              duration: 0,
            });
          },
        });
      }
      setTaskModalVisible(false);
      taskForm.resetFields();
    });
  };

  console.log("Rendering TaskBoard with tasks:", tasks);

  return (
    <>
      <TaskBoard
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskEdit={handleTaskEdit}
        onAddTask={() => setTaskModalVisible(true)}
      />
      <TaskModal
        visible={isTaskModalVisible || !!editingTask}
        onCancel={() => {
          setTaskModalVisible(false);
          setEditingTask(null);
        }}
        onOk={handleTaskSubmit}
        form={taskForm}
        users={users}
        customers={customers}
      />
    </>
  );
};

export default Kanban;