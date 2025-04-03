import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/hook/useTask";
import { Pencil, Trash2 } from "lucide-react";

const TaskTable = () => {
  const {
    task: tasks,
    formMethods,
    onModalOpen,
    deleteTask,
    setIsEditTask,
  } = useTaskContext();

  const onEdit = (data: Task) => {
    console.log(data);
    onModalOpen();
    setIsEditTask(true);
    formMethods.reset({ ...data });
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4  font-semibold ">Title</th>
            <th className="py-3 px-4 font-semibold">Description</th>
            <th className="py-3 px-4  font-semibold">Status</th>
            <th className="py-3 px-4  font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="py-3 px-4">{task.title}</td>
              <td className="py-3 px-4">{task.description}</td>
              <td className="py-3 px-4 capitalize">{task.status}</td>
              <td className="py-3 px-4 flex gap-2 justify-center">
                <Button
                  variant={"default"}
                  className="text-xs rounded-full  w-7 h-7"
                  onClick={() => onEdit(task)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant={"destructive"}
                  className="text-xs rounded-full  w-7 h-7"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
