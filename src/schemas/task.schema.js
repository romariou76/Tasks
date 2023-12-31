import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
  estado:z.string().optional(),
  resposable: z.string().optional(),
  date: z.string().datetime().optional(),
  prioridad: z.string().optional(),
});