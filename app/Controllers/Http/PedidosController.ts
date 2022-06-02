import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Cliente from "App/Models/Cliente";
import Endereco from "App/Models/Endereco";
import Pedido from "App/Models/Pedido";
import PedidoEndereco from "App/Models/PedidoEndereco";
import CreatePedidoValidator from "App/Validators/CreatePedidoValidator";
var randomstring = require("randomstring");

export default class PedidosController {
  public async store({ auth, response, request }: HttpContextContract) {
    const payload = await request.validate(CreatePedidoValidator);

    const userAuth = await auth.use("api").authenticate();
    const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

    let hash_ok: boolean = false;
    let hash_id: string = "";
    while (hash_ok == false) {
      hash_id = randomstring.generate({
        length: 6,
        charset: "alphanumeric",
        capitalization: "uppercase",
      });

      const hash = await Pedido.findBy("hash_id", hash_id);

      if (hash == null) {
        hash_ok = true;
      }
    }

    // Transaction criando
    const trx = await Database.transaction();

    const endereco = await Endereco.findByOrFail("id", payload.endereco_id);

    try {
      const end = await PedidoEndereco.create({
        cidadeId: endereco.cidadeId,
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        pontoReferencia: endereco.pontoReferencia,
        complemento: endereco.complemento,
      });

      // Busca do custo de entrega e calcular valor total do pedido
      

    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }
}
