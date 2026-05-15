
import { z } from 'zod'

export const updatePersonSchema =
  z.object({
    name: z.string().min(3).optional(),

    email: z.email().optional(),

    phone: z.string().optional(),

    address: z.string().optional(),

    gender: z.string().optional(),

    profession: z.string().optional(),

    education: z.string().optional(),
  })