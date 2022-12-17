import Categoria from "App/Models/Categoria";
import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import Estabelecimento from "App/Models/Estabelecimento";
import User from "App/Models/User";

export default class CategoriaPolicy extends BasePolicy {
  public async isOwner(user: User, categoria: Categoria) {
    const estabelecimento = await Estabelecimento.query()
      .where("user_id", user.id)
      .firstOrFail();

    return categoria.estabelecimento_id === estabelecimento.id;
  }
}
