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

  public async update({}: HttpContextContract) {
    return "Hello World!";
  }

  public async destroy({}: HttpContextContract) {
    return "Hello World!";
  }
}
