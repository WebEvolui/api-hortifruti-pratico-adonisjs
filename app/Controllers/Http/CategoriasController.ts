import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Categoria from "App/Models/Categoria";
import Estabelecimento from "App/Models/Estabelecimento";
import CreateEditCategoriaValidator from "App/Validators/CreateEditCategoriaValidator";

export default class CategoriasController {
  public async store({
    request,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const payload = await request.validate(CreateEditCategoriaValidator);
    const userAuth = await auth.use("api").authenticate();
    const estabelecimento = await Estabelecimento.findByOrFail(
      "user_id",
      userAuth.id
    );

    const categoria = await Categoria.create({
      nome: payload.nome,
      descricao: payload.descricao,
      posicao: payload.posicao,
      ativo: payload.ativo,
      estabelecimento_id: estabelecimento.id,
    });

    return response.ok(categoria);
  }

  public async index({ auth, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const userAuth = await auth.use("api").authenticate();
    const estabelecimento = await Estabelecimento.findByOrFail(
      "user_id",
      userAuth.id
    );

    const categorias = await Categoria.query()
      .whereNull("deleted_at")
      .where("estabelecimento_id", estabelecimento.id)
      .orderBy("posicao", "asc");

    return response.ok(categorias);
  }

  public async update({
    request,
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const payload = await request.validate(CreateEditCategoriaValidator);
    const categoria = await Categoria.findOrFail(params.id);

    await bouncer.with("CategoriaPolicy").authorize("isOwner", categoria);

    categoria.merge(payload);
    await categoria.save();

    return response.ok(categoria);
  }

  public async destroy({ response, params, bouncer }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const categoria = await Categoria.findOrFail(params.id);
    await bouncer.with("CategoriaPolicy").authorize("isOwner", categoria);

    try {
      await Categoria.query()
        .where("id", params.id)
        .update({ deletedAt: new Date() });
    } catch {
      return response.badRequest();
    }
  }
}
