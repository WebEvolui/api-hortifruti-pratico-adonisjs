import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Admin from "App/Models/Admin";
import User from "App/Models/User";

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "admin@email.com",
      password: "123456",
      tipo: "admins",
    });

    await Admin.create({
      nome: "Admin",
      userId: user.id,
    });
  }
}
