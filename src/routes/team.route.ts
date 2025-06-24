import { Context, Hono } from "hono";
import { env } from "hono/adapter";
import { zValidator } from "@hono/zod-validator";
import { TeamService } from "../services/team.service";
import { TeamContext } from "../schemas/IContexts/team.context";
import { teamSchema } from "../schemas/team.schema";

const teamRoute = new Hono();

teamRoute
  .get("/", async (context: Context) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(context, "workerd");
    try {
      return context.json(await TeamService.getAll(DATABASE_URL));
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  })
  .get("/:id", async (context: Context) => {
    const id = context.req.param("id");
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(context, "workerd");
    try {
      return context.json(await TeamService.getById(DATABASE_URL, Number(id)));
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  })
  .post(
    "/",
    zValidator("json", teamSchema, (result, context: Context) => {
      if (!result.success) {
        return context.json(result.error, 400);
      }
    }),
    async (context: TeamContext) => {
      const { DATABASE_URL } = env<{ DATABASE_URL: string }>(
        context,
        "workerd",
      );
      try {
        const team = context.req.valid("json");
        return context.json(await TeamService.addTeam(DATABASE_URL, team));
      } catch (error: any) {
        return context.json({ error: error.message }, 500);
      }
    },
  )
  .put(
    "/:id",
    zValidator("json", teamSchema, (result, context: Context) => {
      if (!result.success) {
        return context.json(result.error, 400);
      }
    }),
    async (context: TeamContext) => {
      const id = context.req.param("id");
      const { DATABASE_URL } = env<{ DATABASE_URL: string }>(
        context,
        "workerd",
      );
      try {
        const team = context.req.valid("json");
        return context.json(
          await TeamService.updateTeam(DATABASE_URL, Number(id), team),
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
      await TeamService.deleteTeam(DATABASE_URL, Number(id));
      return context.text("deleted");
    } catch (error: any) {
      return context.json({ error: error.message }, 500);
    }
  });

export default teamRoute;
