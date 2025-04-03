import { createContext, useContext, ReactNode } from "react";
import useTask, { Task } from "@/hook/useTask";

interface TaskContextType {
  createTask: (data: Task) => void;
  formMethods: ReturnType<typeof useTask>["formMethods"];
  task: Task[];
  updateTask: (id: number, data: Task) => void;
  isTaskModelOpen: boolean;
  onModalClose(): void;
  onModalOpen(): void;
  deleteTask(id: number): void;
  setIsEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  isEditTask: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    createTask,
    formMethods,
    task,
    updateTask,
    isTaskModelOpen,
    onModalClose,
    onModalOpen,
    deleteTask,
    setIsEditTask,
    isEditTask,
  } = useTask();

  return (
    <TaskContext.Provider
      value={{
        createTask,
        formMethods,
        task,
        updateTask,
        isTaskModelOpen,
        onModalClose,
        onModalOpen,
        deleteTask,
        setIsEditTask,
        isEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }
  return context;
};
