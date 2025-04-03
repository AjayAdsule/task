import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/hook/useTask";

import { Controller } from "react-hook-form";

const TaskModel = () => {
  const { isTaskModelOpen, onModalClose } = useTaskContext();
  const { formMethods, createTask, isEditTask, updateTask } = useTaskContext();

  const onSubmit = (data: Task) => {
    if (isEditTask && data.id) {
      updateTask(data.id, data);
    } else {
      createTask(data);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  return (
    <Dialog open={isTaskModelOpen} onOpenChange={onModalClose}>
      <DialogContent className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[350px]">
          {/* Title Field */}
          <div className="flex flex-col ">
            <label className=" text-sm font-medium">Title</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter task title" />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter task description" />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <Controller
              name="status"
              control={control}
              defaultValue="todo"
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To-Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Save Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModel;
