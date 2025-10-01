import z from "zod";

export const createStatementSchema = z.object({
    text: z.string().min(5).max(100, 'Maximum number of characters - 100'),
}).required()

export type CreateStatementDto = z.infer<typeof createStatementSchema>;