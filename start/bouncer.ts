import Bouncer from "@ioc:Adonis/Addons/Bouncer";
import User from "App/Models/User";

export const { actions } = Bouncer.define(
  "UserIsEstabelecimento",
  (user: User) => {
    const typesAlloed = ["estabelecimentos"];

    return typesAlloed.includes(user.tipo);
  }
);

export const { policies } = Bouncer.registerPolicies({
  PedidoPolicy: () => import("App/Policies/PedidoPolicy"),
  ProdutoPolicy: () => import("App/Policies/ProdutoPolicy"),
  ClientePolicy: () => import("App/Policies/ClientePolicy"),
  CategoriaPolicy: () => import("App/Policies/CategoriaPolicy"),
});
