import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "@hello-pangea/dnd";
import { Card, Button, Tabs } from "antd";
import { TaskCard } from "./TaskCard";
import { Task } from "./types";
import { theme } from "antd";
import { useTranslation } from "react-i18next";

const { useToken } = theme;

interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: number, status: string) => void;
  onTaskDelete: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onAddTask: () => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTaskEdit,
  onAddTask,
}) => {
  const { t } = useTranslation();
  const { token } = useToken();

  console.log("Tasks in TaskBoard:", tasks);

  const handleDragEnd = (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    onTaskUpdate(parseInt(draggableId), destination.droppableId);
  };

  const statuses = ["To Do", "In Progress", "Completed", "Cancelled"];

  const renderBoard = (statuses: string[]) => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: 16 }}>
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided: DroppableProvided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: 300,
                  background: "white",
                  padding: 12,
                  borderRadius: 4,
                  minHeight: 400,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ textAlign: "center", marginBottom: 16 }}>{t(status)}</h3>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided: DraggableProvided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            marginBottom: 12,
                            backgroundColor: token.colorBgContainer,
                            ...provided.draggableProps.style,
                          }}
                          bodyStyle={{ padding: 12 }}
                        >
                          <TaskCard
                            task={task}
                            onEdit={onTaskEdit}
                            onDelete={onTaskDelete}
                          />
                        </Card>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );

  return (
    <Tabs
      defaultActiveKey="tasks"
      items={[
        {
          key: "tasks",
          label: t("Tasks"),
          children: (
            <>
              <Button type="primary" onClick={onAddTask} style={{ marginBottom: 16 }}>
                {t("Add New Task")}
              </Button>
              {renderBoard(statuses)}
            </>
          ),
        },
      ]}
    />
  );
};