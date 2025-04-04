import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskContext } from "@/context/TaskContext";
import useDebounce from "@/hook/useDebounce";
import { Task } from "@/hook/useTask";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const TaskTable = () => {
  const { task, formMethods, onModalOpen, deleteTask, setIsEditTask } =
    useTaskContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const onEdit = (data: Task) => {
    onModalOpen();
    setIsEditTask(true);
    formMethods.reset({ ...data });
  };
  useEffect(() => {
    setTasks(task);
  }, [task]);
  const [searchParam, setSearchParam] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleSearch = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filtered = task.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseValue) ||
        task.description.toLowerCase().includes(lowerCaseValue)
    );

    setTasks(filtered);
  };
  const debouncedSearch = useDebounce(handleSearch, 500);
  return (
    <div className="overflow-x-auto mt-6">
      <div className="flex justify-end">
        <Input
          className="w-[200px]"
          placeholder="search task"
          value={searchParam}
          onChange={onChange}
        />
      </div>
      {tasks.length > 0 ? (
        <table className="w-full bg-white border border-gray-200 mt-4">
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
                    onClick={() => deleteTask(task.id as number)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-4">
          <p className="text-lg font-semibold">No task found</p>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
