// import React, { useState, useEffect } from "react";
// import { 
//   useList, 
//   useUpdate, 
//   useCreate, 
//   useDelete, 
//   useGetIdentity, 
//   HttpError 
// } from "@refinedev/core";
// import { notification, Modal, Form } from "antd";
// import { TaskBoard } from "./TaskBoard";
// import { TaskModal } from "./TaskModal";
// import { Task, User, User2 } from "./types";
// import dayjs from "dayjs";

// const Kanban: React.FC = () => {
//   const { data: user } = useGetIdentity<User>();
//   const [isTaskModalVisible, setTaskModalVisible] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [taskForm] = Form.useForm();

//   // Data fetching from task-managements
//   const { data: tasksData, error: tasksError } = useList<Task>({
//     resource: "task-managements",
//     meta: { 
//       pagination: { current: 1, pageSize: 25 }, 
//       populate: ["customer", "resolver", "comments"] 
//     },
//   });
//   const { data: usersData, error: usersError } = useList<User>({ resource: "users" });
//   const { data: user2sData, error: user2sError } = useList<User2>({ resource: "user2s" });

//   const { mutate: updateTask } = useUpdate<Task, HttpError>();
//   const { mutate: deleteTask } = useDelete<Task, HttpError>();
//   const { mutate: createTask } = useCreate<Task, HttpError>();

//   // Log errors and data for debugging
//   useEffect(() => {
//     console.log("Tasks Data:", tasksData);
//     console.log("Users Data:", usersData);
//     console.log("User2s Data:", user2sData);
//     if (tasksError) console.error("Tasks Fetch Error:", tasksError);
//     if (usersError) console.error("Users Fetch Error:", usersError);
//     if (user2sError) console.error("User2s Fetch Error:", user2sError);
//   }, [tasksError, usersError, user2sError, tasksData, usersData, user2sData]);

//   const tasks = tasksData?.data || [];
//   const users = usersData?.data || [];
//   const user2s = user2sData?.data || [];

//   // Overdue notification (checking tobeCompletedDate and status)
//   useEffect(() => {
//     console.log("Tasks for overdue check:", tasks);
//     tasks.forEach((task) => {
//       if (task.tobeCompletedDate && task.status !== "Completed") {
//         if (dayjs(task.tobeCompletedDate).isBefore(dayjs())) {
//           notification.warning({
//             message: "Overdue Task",
//             description: `${task.issueDescription} is overdue!`,
//             duration: 0,
//           });
//         }
//       }
//     });
//   }, [tasks]);

//   const handleTaskUpdate = (taskId: number, status: string) => {
//     updateTask({ 
//       resource: "task-managements", 
//       id: taskId, 
//       values: { status } 
//     }, {
//       onSuccess: () => {
//         console.log("Task updated successfully");
//         notification.success({
//           message: "Task Updated",
//           description: "The task status has been updated successfully.",
//         });
//       },
//       onError: (error: HttpError) => {
//         console.error("Error updating task:", error);
//         notification.error({
//           message: "Update Failed",
//           description: `Failed to update task: ${error.message || "Unknown error"}`,
//           duration: 0,
//         });
//       },
//     });
//   };

//   const handleTaskDelete = (task: Task) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this task?",
//       onOk: () => {
//         deleteTask({ 
//           resource: "task-managements", 
//           id: task.id 
//         }, {
//           onSuccess: () => {
//             notification.success({
//               message: "Task Deleted",
//               description: "The task has been deleted successfully.",
//             });
//           },
//           onError: (error: HttpError) => {
//             console.error("Error deleting task:", error);
//             notification.error({
//               message: "Deletion Failed",
//               description: `Failed to delete task: ${error.message || "Unknown error"}`,
//               duration: 0,
//             });
//           },
//         });
//       },
//     });
//   };

//   const handleTaskEdit = (task: Task) => {
//     setEditingTask(task);
//     taskForm.setFieldsValue({
//       issueDescription: task.issueDescription,
//       notes: task.notes,
//       priority: task.priority,
//       status: task.status,
//       issueDate: task.issueDate ? dayjs(task.issueDate) : null,
//       tobeCompletedDate: task.tobeCompletedDate ? dayjs(task.tobeCompletedDate) : null,
//       actualCompleteDate: task.actualCompleteDate ? dayjs(task.actualCompleteDate) : null,
//       customer: task.customer?.id,
//       resolver: task.resolver?.id,
//     });
//   };

//   const handleTaskSubmit = () => {
//     taskForm.validateFields().then((values) => {
//       const taskData = {
//         issueDescription: values.issueDescription,
//         notes: values.notes,
//         priority: values.priority,
//         status: values.status,
//         issueDate: values.issueDate ? dayjs(values.issueDate).toISOString() : null,
//         tobeCompletedDate: values.tobeCompletedDate ? dayjs(values.tobeCompletedDate).toISOString() : null,
//         actualCompleteDate: values.actualCompleteDate ? dayjs(values.actualCompleteDate).toISOString() : null,
//         customer: values.customer ? Number(values.customer) : null,
//         resolver: values.resolver ? Number(values.resolver) : null,
//         comments: [], // Initialize as empty if not provided in the form
//       };

//       if (editingTask) {
//         updateTask({ 
//           resource: "task-managements", 
//           id: editingTask.id, 
//           values: taskData 
//         }, {
//           onSuccess: () => {
//             notification.success({
//               message: "Task Updated",
//               description: "The task has been updated successfully.",
//             });
//             setEditingTask(null);
//           },
//           onError: (error: HttpError) => {
//             console.error("Error updating task:", error);
//             notification.error({
//               message: "Update Failed",
//               description: `Failed to update task: ${error.message || "Unknown error"}`,
//               duration: 0,
//             });
//           },
//         });
//       } else {
//         createTask({ 
//           resource: "task-managements", 
//           values: taskData 
//         }, {
//           onSuccess: () => {
//             notification.success({
//               message: "Task Created",
//               description: "The task has been created successfully.",
//             });
//           },
//           onError: (error: HttpError) => {
//             console.error("Error creating task:", error);
//             notification.error({
//               message: "Creation Failed",
//               description: `Failed to create task: ${error.message || "Unknown error"}`,
//               duration: 0,
//             });
//           },
//         });
//       }
//       setTaskModalVisible(false);
//       taskForm.resetFields();
//     });
//   };

//   return (
//     <>
//       <TaskBoard
//         tasks={tasks}
//         onTaskUpdate={handleTaskUpdate}
//         onTaskDelete={handleTaskDelete}
//         onTaskEdit={handleTaskEdit}
//         onAddTask={() => setTaskModalVisible(true)}
//       />
//       <TaskModal
//         visible={isTaskModalVisible || !!editingTask}
//         onCancel={() => {
//           setTaskModalVisible(false);
//           setEditingTask(null);
//         }}
//         onOk={handleTaskSubmit}
//         form={taskForm}
//         users={users}
//         customer={user2s}
//       />
//     </>
//   );
// };

// export default Kanban;