import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePedidoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    estabelecimento_id: schema.number([
      rules.exists({ table: "estabelecimentos", column: "id" }),
    ]),
    meio_pageamento_id: schema.number([
      rules.exists({ table: "meios_pageamentos", column: "id" }),
    ]),
    troco_para: schema.number.nullableAndOptional(),
    observacao: schema.string.nullableAndOptional({ trim: true }),
    produtos: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        produto_id: schema.number([
          rules.exists({ table: "produtos", column: "id" }),
        ]),
        quantidade: schema.number(),
        observacao: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    endereco_id: schema.number([
      rules.exists({ table: "enderecos", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
