import { Hono } from "hono";
import playerRoute from "./routes/player.route";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(prettyJSON());

app.get("/", (c) => {
  return c.text("App funcionando!");
});

app.route("/jugadores", playerRoute);
export default app;
