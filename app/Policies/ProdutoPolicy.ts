import Categoria from "App/Models/Categoria";
import Estabelecimento from "App/Models/Estabelecimento";
import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import User from "App/Models/User";

export default class ProdutoPolicy extends BasePolicy {
  public async isOwner(user: User, categoria_id: number) {
    const estabelecimento = await Estabelecimento.query()
      .where("user_id", user.id)
      .firstOrFail();

    const categoria = await Categoria.findOrFail(categoria_id);

    return categoria.estabelecimento_id === estabelecimento.id;
  }
}
