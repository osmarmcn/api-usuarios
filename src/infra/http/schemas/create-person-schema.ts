
import { z } from 'zod'

export const createPersonSchema = z.object({
  name: z
    .string()
    .min(3),

  email: z
    .email(),

  cpf: z
    .string()
    .length(11),

  phone: z
    .string()
    .min(10),

  address: z
    .string(),

  gender: z
    .string()
    .optional(),

  profession: z
    .string()
    .optional(),

  education: z
    .string()
    .optional(),
})