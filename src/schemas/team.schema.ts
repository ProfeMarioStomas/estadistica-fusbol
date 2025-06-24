import { z } from "zod/v4";

export const teamSchema = z.object({
  name: z
    .string("Debe tener únicamente letras")
    .min(3, "Como mínimo debe tener 3 caracteres")
    .max(50, "Como máximo puede tener hasta 50 caracteres"),
  league: z
    .string("Debe tener únicamente letras")
    .min(3, "Como mínimo debe tener 3 caracteres")
    .max(50, "Como máximo puede tener hasta 50 caracteres"),
});
