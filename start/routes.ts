import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";

Route.get("/", async () => {
  User.create({
    email: "admin@email.com",
    password: "123456",
    tipo: "admin",
  });
});
