import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      
      <TaskCard></TaskCard>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-14">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              Agrega una Tarea 
            </h1>
          </div>
        </div>
      )}

    </>
  );
}
