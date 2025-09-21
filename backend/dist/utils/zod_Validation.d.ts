import z from 'zod';
export declare const PasswordSchema: z.ZodString;
export declare const AdminLoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const AgentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    phone: z.ZodString;
}, z.core.$strip>;
export declare const TaskSchema: z.ZodObject<{
    FirstName: z.ZodString;
    Phone: z.ZodString;
    Notes: z.ZodString;
}, z.core.$strip>;
export declare const AgentUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const TaskUpdateSchema: z.ZodObject<{
    FirstName: z.ZodOptional<z.ZodString>;
    Phone: z.ZodOptional<z.ZodString>;
    Notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=zod_Validation.d.ts.map