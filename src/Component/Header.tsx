import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";

const Header = () => {
  const { onModalOpen } = useTaskContext();

  return (
    <div className="flex justify-between p-2 items-center border rounded-md ">
      <h5 className="text-2xl">Users</h5>
      <Button variant={"default"} onClick={onModalOpen}>
        Create User
      </Button>
    </div>
  );
};

export default Header;
