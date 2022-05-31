import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cliente from "App/Models/Cliente";
import Endereco from "App/Models/Endereco";
import CreateEditEnderecoValidator from "App/Validators/CreateEditEnderecoValidator";

export default class EnderecosController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateEditEnderecoValidator);
    const userAuth = await auth.use("api").authenticate();
    const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

    const endereco = await Endereco.create({
      cidadeId: payload.cidade_id,
      clienteId: cliente.id,
      rua: payload.rua,
      numero: payload.numero,
      bairro: payload.bairro,
      pontoReferencia: payload.ponto_referencia,
      complemento: payload.complemento,
    });

    return response.ok(endereco);
  }

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
