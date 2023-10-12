import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink } from "../ui";
import {EyeIcon} from "../../assets/EyeIcon";
import {DeleteIcon} from "../../assets/DeleteIcon";

export function TaskCard() {
  const { tasks, deleteTask } = useTasks(); // Utiliza useTasks para obtener las tareas y otras funciones

  return (
    <div className="p-8">
  <table className="border border-gray-700 w-full text-left">
    <thead className="bg-indigo-600">
      <tr className="">
        <th className="capitalize px-3.5 py-2">ID</th>
        <th className="capitalize px-3.5 py-2">Title</th>
        <th className="capitalize px-3.5 py-2">Description</th>
        <th className="capitalize px-3.5 py-2">ESTADO</th>
        <th className="capitalize px-3.5 py-2">Responsable</th>
        <th className="capitalize px-3.5 py-2">Date</th>
        <th className="capitalize px-3.5 py-2">PRIORIDAD</th>
        <th className="capitalize px-3.5 py-2">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-300">
      {tasks.map((task, index) => (
        <tr key={task._id} className="border-b border-gray-700">
          <td className="px-3.5 py-2">{index + 1}</td>
          <td className="px-3.5 py-2">{task.title}</td>
          <td className="px-3.5 py-2">{task.description}</td>
          <td className="px-3.5 py-2">{task.estado}</td>
          <td className="px-3.5 py-2">{task.responsable}</td>
          <td className="px-3.5 py-2">
            {task.date &&
              new Date(task.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </td>
          <td className="px-3.5 py-2">{task.prioridad}</td>
          
          <td className="flex gap-2 items-center">
            <Button onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </Button>
            <ButtonLink to={`/tasks/${task._id}`}>
              <EyeIcon />
            </ButtonLink>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
// <Card>
//   <header className="flex justify-between">
//     <h1 className="text-2xl font-bold">{task.title}</h1>
//     <div className="flex gap-x-2 items-center">
//       <Button onClick={() => deleteTask(task._id)}>Delete</Button>
//       <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
//     </div>
//   </header>
//   <p className="text-slate-300">{task.description}</p>
//   {/* format date */}
//   <p className="text-slate-300">{task.responsable}</p>
//   <p>
//     {task.date &&
//       new Date(task.date).toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       })}
//   </p>
// </Card>