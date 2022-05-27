import Route from "@ioc:Adonis/Core/Route";





Route.get("/", async () => {
  return {
    hortifruti: "prático",
  };
});