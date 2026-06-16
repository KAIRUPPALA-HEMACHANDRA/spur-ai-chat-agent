import { buildApp } from "./app.js";

const start = async () => {
  try {
    const app = await buildApp();

    const port =
      Number(process.env.PORT) || 3000;

    await app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log(
      `Server started on port ${port}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();



// import { buildApp } from "./app.js";

// const start = async () => {
//   try {
//     const app = await buildApp();

//     await app.listen({
//       port: 3000,
//       host: "0.0.0.0",
//     });

//     console.log("Server started");
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// start();

