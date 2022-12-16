import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import Estabelecimento from "App/Models/Estabelecimento";
import Pedido from "App/Models/Pedido";
import User from "App/Models/user";

export default class PedidoPolicy extends BasePolicy {
  public async canUpdate(user: User, pedido: Pedido) {
    const estabelecimento = await Estabelecimento.query()
      .where("user_id", user.id)
      .firstOrFail();

    return pedido.estabelecimento_id === estabelecimento.id;
  }
}
