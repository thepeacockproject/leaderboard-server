import { createEnv } from "@t3-oss/env-core"
import * as z from "zod"

export const env = createEnv({
    server: {
        PORT: z
            .string()
            .describe("The port the server should listen on.")
            .transform((s) => parseInt(s, 10))
            .pipe(z.number())
            .default("3000"),

        NODE_ENV: z
            .string()
            .describe("The environment the server is running in.")
            .refine((s): s is "development" | "production" =>
                ["development", "production"].includes(s),
            )
            .default("production"),
    },
    client: {},
    runtimeEnv: process.env,
    clientPrefix: "CLIENT_",
})
