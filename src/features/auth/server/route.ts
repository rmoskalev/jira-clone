import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { loginSchema, signUpSchema } from "../schemas";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.valid("json");

    console.log(email, password);

    return c.json({ success: "ok" });
  })
  .post("/signUp", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");

    console.log(name, email, password);

    return c.json({ success: "ok" });
  });

export default app;
