import { Hono } from "hono";
import playerRoute from "./routes/player.route";
import { prettyJSON } from "hono/pretty-json";
import teamRoute from "./routes/team.route";
import { cors } from "hono/cors";

const app = new Hono();

app.options("*", (c) => {
  return c.text("ok", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    },
  });
});

app.use("*", cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(prettyJSON());

app.get("/", (c) => {
  return c.text("App funcionando!");
});

app.route("/jugadores", playerRoute);
app.route("/equipos", teamRoute);
export default app;
