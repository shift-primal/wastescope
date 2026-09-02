import z from "zod";

export const uploadFormSchema = z.object({
	file: z.instanceof(File, { message: "Velg en fil" }),
	bank: z.enum(["dnb", "valle"] as const),
});
