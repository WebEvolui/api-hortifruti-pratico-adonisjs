import { DateTime } from "luxon";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateEditProdutoValidator from "App/Validators/CreateEditProdutoValidator";
import Drive from "@ioc:Adonis/Core/Drive";
import Produto from "App/Models/Produto";

export default class ProdutosController {
  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const payload = await request.validate(CreateEditProdutoValidator);

    await bouncer
      .with("ProdutoPolicy")
      .authorize("isOwner", payload.categoria_id);

    if (payload.imagem) {
      await payload.imagem.moveToDisk("./");
    }

    const produto = await Produto.create({
      nome: payload.nome,
      descricao: payload.descricao,
      imagem: payload.imagem
        ? await Drive.getUrl(payload.imagem.fileName!)
        : null,
      preco: payload.preco,
      unidade: payload.unidade,
      posicao: payload.posicao,
      ativo: payload.ativo,
      categoria_id: payload.categoria_id,
    });

    return response.created(produto);
  }

  public async index({ response, request, bouncer }: HttpContextContract) {
    if (request.input("categoria_id") >= 1) {
      await bouncer.authorize("UserIsEstabelecimento");
      await bouncer
        .with("ProdutoPolicy")
        .authorize("isOwner", request.input("categoria_id"));

      // const page = request.input("page", 1);
      // const limt = 15;

      const produtos = await Produto.query()
        // .if(request.input("ativo"), (builder) => {
        //   builder.where("ativo", request.input("ativo"));
        // })
        .if(request.input("categoria_id"), (builder) => {
          builder.where("categoria_id", request.input("categoria_id"));
        })
        .whereNull("deleted_at");
      // .paginate(page, limit);

      return response.ok(produtos);
    } else {
      return response.badRequest("A categoria_id é obrigatória");
    }
  }

  public async update({
    request,
    response,
    bouncer,
    params,
  }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const payload = await request.validate(CreateEditProdutoValidator);
    const produto = await Produto.findOrFail(params.id);

    await bouncer
      .with("ProdutoPolicy")
      .authorize("isOwner", produto.categoria_id);

    if (payload.imagem) {
      if (produto.imagem) {
        const file = produto.imagem.split("/").filter(Boolean).pop();
        if (file?.length) await Drive.delete(file);
      }

      await payload.imagem.moveToDisk("./");
    }

    let tmpProduct = {
      nome: payload.nome,
      descricao: payload.descricao,
      preco: payload.preco,
      unidade: payload.unidade,
      posicao: payload.posicao,
      ativo: payload.ativo,
      categoria_id: payload.categoria_id,
    };

    if (payload.imagem) {
      tmpProduct["imagem"] = await Drive.getUrl(payload.imagem.fileName!);
    }

    produto.merge(tmpProduct);
    await produto.save();

    return response.ok(produto);
  }

  public async destroy({ response, bouncer, params }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const produto = await Produto.findOrFail(params.id);

    await bouncer
      .with("ProdutoPolicy")
      .authorize("isOwner", produto.categoria_id);

    produto.deletedAt = DateTime.local();
    await produto.save();

    return response.noContent();
  }

  public async removeImagem({
    response,
    bouncer,
    params,
  }: HttpContextContract) {
    await bouncer.authorize("UserIsEstabelecimento");

    const produto = await Produto.findOrFail(params.id);

    await bouncer
      .with("ProdutoPolicy")
      .authorize("isOwner", produto.categoria_id);

    if (produto.imagem) {
      const file = produto.imagem.split("/").filter(Boolean).pop();
      if (file?.length) await Drive.delete(file);

      produto.imagem = null;
      await produto.save();
    }

    return response.noContent();
  }
}
