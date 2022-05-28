import Route from "@ioc:Adonis/Core/Route";

// Login para os 3 tippos de user
Route.post("/login", "AuthController.login");
Route.post("logout", "AuthController.logout");

Route.get("/", async () => {
  return {
    hortifruti: "prático",
  };
});
