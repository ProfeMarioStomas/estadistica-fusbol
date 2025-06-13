import { Hono } from "hono";
import playerRoute from "./routes/player.route";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";

const app = new Hono();

app.use(prettyJSON());

app.use("*", cors({
  origin: "http://127.0.0.1:5500"
}));

app.get("/", (c) => {
  return c.text("App funcionando!");
});

app.route("/jugadores", playerRoute);
export default app;
