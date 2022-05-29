import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cliente from "App/Models/Cliente";
import User from "App/Models/User";
import CreateClienteValidator from "App/Validators/CreateClienteValidator";

export default class ClientesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClienteValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      tipo: "clientes",
    });

    const cliente = await Cliente.create({
      nome: payload.nome,
      telefone: payload.telefone,
      userId: user.id,
    });

    return response.ok({
      id: cliente.id,
      nome: cliente.nome,
      email: user.email,
      telefone: cliente.telefone,
    });
  }
}
