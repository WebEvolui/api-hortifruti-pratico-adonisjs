import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreatePedidoValidator from "App/Validators/CreatePedidoValidator";

export default class PedidosController {
  public async store({ auth, response, request }: HttpContextContract) {
    const payload = await request.validate(CreatePedidoValidator);
    
  }
}
