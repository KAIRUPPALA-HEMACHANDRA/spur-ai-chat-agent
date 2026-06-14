import { buildApp } from "./app.js";

const start = async () => {
  try {
    const app = buildApp();

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("Server started");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

