// import { defineConfig } from "drizzle-kit"
//
// export default defineConfig({
//   dialect: "postgresql", // "postgresql" | "mysql"
//   schema: "./src/db/schemas.js",
//   out: "./src/migrations/"
// })


export default config = {
  dialect: "postgresql",
  schema: "./src/db/schemas.js",
  out: "./src/migrations/"
}
