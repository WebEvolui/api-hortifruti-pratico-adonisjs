import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateEditProdutoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    descricao: schema.string.nullableAndOptional({ trim: true }),
    imagem: schema.file.nullableAndOptional({
      size: "5mb",
      extnames: ["jpg", "png", "jpeg"],
    }),
    preco: schema.number(),
    unidade: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(3),
    ]),
    posicao: schema.number(),
    ativo: schema.boolean.optional(),
    categoria_id: schema.number([
      rules.exists({
        table: "categorias",
        column: "id",
        where: { deleted_at: null },
      }),
    ]),
  });

  public messages: CustomMessages = {};
}
