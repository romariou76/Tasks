import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Definición de la función onSubmit
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("estado", task.estado);
        setValue("responsable", task.responsable);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("prioridad", task.prioridad);
        setValue("completed", task.completed);
      }
    };

    // Llama a la función para obtener la lista de usuarios al cargar el formulario
    fetchUsers();

    loadTask();
  }, []);


  const[users,setUsers]=useState([]);

  const fetchUsers = async () => {
    try {
      // Realiza una solicitud a tu backend para obtener la lista de usuarios
      const response = await fetch("mongodb+srv://julius:julius3000@cluster0.ktf0np8.mongodb.net/test/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios: ", error);
    }
  };
  console.log(users)
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="estado">Estado</Label>
        <select name="estado" {...register("estado")}>
          <option value="Por hacer">Por hacer</option>
          <option value="En progreso">En progreso</option>
          <option value="Completado">Completado</option>
        </select>

        <Label htmlFor="responsable">Responsable</Label>
        <select name="responsable" {...register("responsable")}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <Label htmlFor="prioridad">Prioridad</Label>
        <select name="prioridad" {...register("prioridad")}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        <Button>Save</Button>
      </form>
    </Card>
  );
}
