import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Estabelecimento from "App/Models/Estabelecimento";
import User from "App/Models/User";

export default class EstabelecimentoSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "estabelecimento@email.com",
      password: "123456",
      tipo: "estabelecimentos",
    });

    await Estabelecimento.create({
      nome: "Estabelecimento",
      logo: "https://webevolui.com.br/principal/images/web-evolui-logo.png",
      online: true,
      bloqueado: false,
      userId: user.id,
    });
  }
}
