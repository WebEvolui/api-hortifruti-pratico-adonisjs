import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Cliente from "App/Models/Cliente";
import User from "App/Models/User";
import CreateClienteValidator from "App/Validators/CreateClienteValidator";
import EditClienteValidator from "App/Validators/EditClienteValidator";

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

  public async update({
    request,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    const payload = await request.validate(EditClienteValidator);
    const userAuth = await auth.use("api").authenticate();

    // Criando uma transação
    const trx = await Database.transaction();

    try {
      const user = await User.findByOrFail("id", userAuth.id);
      const cliente = await Cliente.findByOrFail("user_id", userAuth.id);

      await bouncer.with("ClientePolicy").authorize("canUpdate", cliente);

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        });
      } else {
        user.merge({
          email: payload.email,
        });
      }

      await user.save();

      cliente.merge({
        nome: payload.nome,
        telefone: payload.telefone,
      });
      await cliente.save();

      // confirma no banco de dados as alterações
      await trx.commit();

      return response.ok({
        id: cliente.id,
        nome: cliente.nome,
        email: user.email,
        telefone: cliente.telefone,
      });
    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }
}
