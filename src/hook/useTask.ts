import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Status = "todo" | "in-progress" | "completed";

const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["todo", "in-progress", "completed"], {
      errorMap: () => ({ message: "Invalid status" }),
    }),
  })
  .passthrough();

export type Task = {
  id?: number;
  title: string;
  description: string;
  status: Status;
};

export default function useTask() {
  const [task, setTask] = useState<Task[]>([]);

  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);

  const [isEditTask, setIsEditTask] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      status: "todo",
    },
  });

  useEffect(() => {
    const getTask = JSON.parse(localStorage.getItem("task") as string);
    setTask(getTask ?? []);
  }, []);

  const createTask = (data: Task) => {
    const newTask: Task = {
      ...data,
      id: task?.length + 1,
    };
    setTask((prev) => {
      const updatedTask = [...prev, newTask];
      localStorage.setItem("task", JSON.stringify(updatedTask));
      return updatedTask;
    });
    setIsTaskModelOpen(false);
    formMethods.reset();
  };

  const updateTask = (id: number, data: Task) => {
    const updatedTasks = task.map((t) => (t.id === id ? { ...t, ...data } : t));
    setTask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    formMethods.reset({ id: "", title: "", description: "", status: "todo" });
    setIsTaskModelOpen(false);
    setIsEditTask(false);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = task.filter((t) => t.id !== id);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  };

  const onModalClose = () => {
    formMethods.reset({ id: "", title: "", description: "", status: "todo" });
    setIsTaskModelOpen(false);
    setIsEditTask(false);
  };

  const onModalOpen = () => {
    setIsTaskModelOpen(true);
  };

  return {
    task,
    formMethods,
    createTask,
    updateTask,
    isTaskModelOpen,
    onModalClose,
    onModalOpen,
    deleteTask,
    setIsEditTask,
    isEditTask,
  };
}
