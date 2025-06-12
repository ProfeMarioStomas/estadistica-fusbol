import { z } from "zod/v4";

export const playerSchema = z.object({
  name: z
    .string("Debe tener únicamente letras")
    .min(3, "Como mínimo debe tener 3 caracteres")
    .max(50, "Como máximo puede tener hasta 50 caracteres"),
  country: z
    .string("Debe tener únicamente letras")
    .min(3, "Como mínimo debe tener 3 caracteres")
    .max(50, "Como máximo puede tener hasta 50 caracteres"),
  birth_at: z.iso.date("Formato fecha incorrecto"),
});
