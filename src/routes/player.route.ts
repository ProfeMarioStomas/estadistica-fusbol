import { Context, Hono } from "hono";
import { env } from "hono/adapter";
import { PlayerService } from "../services/player.service";
import { playerSchema } from "../schemas/player.schema";
import { zValidator } from "@hono/zod-validator";
import { PlayerContext } from "../schemas/IContexts/player.context";

const playerRoute = new Hono();

playerRoute
  .get("/", async (context: Context) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(context, "workerd");
    try {
      return context.json(await PlayerService.getAll(DATABASE_URL));
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  })
  .get("/:id", async (context: Context) => {
    const id = context.req.param("id");
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(context, "workerd");
    try {
      return context.json(
        await PlayerService.getById(DATABASE_URL, Number(id)),
      );
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  })
  .post(
    "/",
    zValidator("json", playerSchema, (result, context: Context) => {
      if (!result.success) {
        return context.json(result.error, 400);
      }
    }),
    async (context: PlayerContext) => {
      const { DATABASE_URL } = env<{ DATABASE_URL: string }>(
        context,
        "workerd",
      );
      try {
        const player = context.req.valid("json");
        return context.json(
          await PlayerService.addPlayer(DATABASE_URL, player),
        );
      } catch (error: any) {
        return context.json({ error: error.message }, 500);
      }
    },
  )
  .put(
    "/:id",
    zValidator("json", playerSchema, (result, context: Context) => {
      if (!result.success) {
        return context.json(result.error, 400);
      }
    }),
    async (context: PlayerContext) => {
      const id = context.req.param("id");
      const { DATABASE_URL } = env<{ DATABASE_URL: string }>(
        context,
        "workerd",
      );
      try {
        const player = context.req.valid("json");
        return context.json(
          await PlayerService.updatePlayer(DATABASE_URL, Number(id), player),
        );
      } catch (error: any) {
        return context.json({ error: error.message }, 500);
      }
    },
  )
  .delete("/:id", async (context: Context) => {
    const id = context.req.param("id");
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(context, "workerd");
    try {
      await PlayerService.deletePlayer(DATABASE_URL, Number(id));
      return context.text("deleted");
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  });

export default playerRoute;
