import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";

const Header = () => {
  const { onModalOpen } = useTaskContext();

  return (
    <div className="flex justify-between p-2 items-center border rounded-md bg-secondary">
      <h5 className="text-2xl">Tasks</h5>
      <Button variant={"default"} onClick={onModalOpen}>
        Create Task
      </Button>
    </div>
  );
};

export default Header;
