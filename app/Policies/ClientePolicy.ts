import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import User from "App/Models/User";
import Cliente from "App/Models/Cliente";

export default class ClientePolicy extends BasePolicy {
  public async canUpdate(user: User, cliente: Cliente) {
    return user.id === cliente.userId;
  }
}
