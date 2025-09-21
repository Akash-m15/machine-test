import z from 'zod';


export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password cannot exceed 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");


export const AdminLoginSchema = z.object({
  email: z.email({ message: "Valid email required" }),
  password: PasswordSchema
})

export const AgentSchema = z.object({
  name: z.string().min(3, { message: "too short" }).max(30, { message: "too long" }),
  email: z.email({ message: "Valid Email Required" }),
  password: PasswordSchema,
  phone : z.string().regex(/^\d{10,15}$/, "Phone must be numeric and 10–15 digits")
});


export const TaskSchema = z.object({
  FirstName: z.string().min(3, { message: "too short" }).max(30, { message: "too long" }),
  Phone:   z.string().regex(/^\d{10,15}$/, "Phone must be numeric and 10–15 digits"),
  Notes: z.string()
})


export const AgentUpdateSchema = AgentSchema.partial();
export const TaskUpdateSchema = TaskSchema.partial();