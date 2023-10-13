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
import { Select, SelectItem } from "@nextui-org/react";

import mongoose from "mongoose";
import useGetAllUsers from "../hooks/GetAllUser";


export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  const Status = [
    { label: "Por hacer", value: "por hacer" },
    { label: "En progreso", value: "en" },
    { label: "Completado", value: "completado" }
  ]
  const Prioridad=[
    {label:"Baja",value:"baja"},
    {label:"Intermedia",value:"intermedia"},
    {label:"Alta",value:"alta"}
  ]

  const { loading, users, error } = useGetAllUsers();

  useEffect(() => {
    if (!loading && users) {
      console.log(users);
    }
  }, [loading, users]);


  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
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
          <Select
            isRequired
            label="Seleccione el estado"
            className="max-w-xs"
            {...register("responsable")}
          >
            {Status.map((Status) => (
              <SelectItem className="text-black"  key={Status.value} value={Status.value}>
                {Status.label}
              </SelectItem>
            ))}
          </Select>

          <Label htmlFor="responsable">Responsable</Label>
        
                {loading ? (
              <p>Cargando...</p>
            ) : users ? (
              <select name="responsable">
                {users.map(user => (
                  <option key={user.id}>{user.username}</option>
                ))}
                </select>
            ) : (
              <p>No hay usuarios disponibles o tu internet cayo.</p>
            )}
         
          <Label htmlFor="prioridad">Prioridad</Label>
          
          <Select
            isRequired
            label="Seleccione la prioridad"
            className="max-w-xs"
            {...register("prioridad")}
            
          >
            {Prioridad.map((Prioridad) => (
              <SelectItem className="text-black" key={Prioridad.value} value={Prioridad.value}>
                {Prioridad.label}
              </SelectItem>
            ))}
          </Select>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />

          <Button color="primary" variant="shadow"> Save</Button>
        </form>
      </Card>
    </div>

  );
}
