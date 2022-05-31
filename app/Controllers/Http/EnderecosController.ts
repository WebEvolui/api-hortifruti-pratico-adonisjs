import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cliente from "App/Models/Cliente";

export default class EnderecosController {
  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

    const getCliente = await Cliente.query()
      .where("id", cliente.id)
      .preload("enderecos", (CidadeQuery) => {
        CidadeQuery.preload("cidade", (queryEstado) => {
          queryEstado.preload("estado");
        });
      })
      .firstOrFail();

    return response.ok(getCliente.enderecos);
  }
}
