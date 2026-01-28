import { Hono } from "hono";
import { cors } from "hono/cors";

// import router from "./link/create.js";
import noterouter from "./notes/create.ts";
const app = new Hono();


app.use(cors());

app.get("/", (c) => {
	return c.json({
		message: "this is the index file"
	});
});
app.route("/api/v1/notes", noterouter)
// app.route("/link", router);

export default app;